using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Utils;

namespace PhotoManager.MongoRepositories.Repositories
{
    public class AlbumRepository
    {
        private readonly PhotoManagerContext _context;

        public AlbumRepository(PhotoManagerContext context)
        {
            _context = context;
        }

        public async Task<AlbumModel> GetAlbumAsync(string albumId)
        {
            return await _context.Albums
                .Find(x => x.AlbumId == albumId)
                .FirstOrDefaultAsync();
        }

        public async Task<AlbumModel> GetAlbumAsync(string name, string userId)
        {
            return await _context.Albums
                .Find(x => x.Name == name && x.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<AlbumModel>> GetAlbumsAsync(string userId, int pageSize, int pageIndex)
        {
            return await _context.Albums
                .Find(x => x.UserId == userId)
                .SortBy(x => x.CreateDate)
                .Page(pageIndex, pageSize)
                .ToListAsync();
        }

        public async Task<long> GetTotalAlbumsAsync(string userId)
        {
            return await _context.Albums
                .CountDocumentsAsync(x => x.UserId == userId);
        }

        public async Task<List<AlbumModel>> GetAlbumSuggestionsAsync(string userId, int maxSuggestions, string search)
        {
            Expression<Func<AlbumModel, bool>> filter;

            if (string.IsNullOrEmpty(search))
            {
                filter = x => x.UserId == userId;
            }
            else
            {
                filter = x => x.UserId == userId && x.Name.ToLower().StartsWith(search.ToLower());
            }

            return await _context.Albums
                .Find(filter)
                .SortBy(x => x.Name)
                .Page(1, maxSuggestions)
                .ToListAsync();
        }

        public async Task<bool> AddAlbumAsync(AlbumModel album)
        {
            if (await AlbumExists(album.Name, album.UserId))
            {
                return false;
            }

            album.CreateDate = DateTime.Now;
            await _context.Albums.InsertOneAsync(album);

            return true;
        }

        public async Task<bool> EditAlbumAsync(AlbumModel album)
        {
            if (await AlbumExists(album.Name, album.UserId))
            {
                var existedAlbum = await GetAlbumAsync(album.Name, album.UserId);
                if (album.AlbumId != existedAlbum.AlbumId)
                {
                    return false;
                }
            }

            var update = Builders<AlbumModel>.Update
                .Set(x => x.Name, album.Name)
                .Set(x => x.Description, album.Description);

            await _context.Albums.UpdateOneAsync(x => x.AlbumId == album.AlbumId, update);
            return true;
        }

        public async Task DeleteAlbumAsync(string albumId)
        {
            await _context.PhotoAlbums.DeleteManyAsync(x => x.AlbumId == albumId);
            await _context.Albums.DeleteOneAsync(x => x.AlbumId == albumId);
        }

        private async Task<bool> AlbumExists(string name, string userId)
        {
            var album = await GetAlbumAsync(name, userId);
            return album != null;
        }

        public async Task<List<(string AlbumId, string Name)>> GetAlbumsAsync(string photoId)
        {
            var albumIds = await _context.PhotoAlbums
                .Find(x => x.PhotoId == photoId)
                .Project(x => x.AlbumId)
                .ToListAsync();

            return await _context.Albums
                .Find(x => albumIds.Contains(x.AlbumId))
                .SortBy(x => x.Name)
                .Project(x => new Tuple<string, string>(x.AlbumId, x.Name).ToValueTuple())
                .ToListAsync();
        }
    }
}
