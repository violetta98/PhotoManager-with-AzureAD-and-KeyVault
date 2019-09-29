using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MongoDB.Driver;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Utils;

namespace PhotoManager.MongoRepositories.Repositories
{
    public class PhotoRepository
    {
        private readonly PhotoManagerContext _context;
        private readonly Cloudinary _сloudinary;

        public PhotoRepository(PhotoManagerContext context, Cloudinary сloudinary)
        {
            _context = context;
            _сloudinary = сloudinary;
        }

        public async Task<PhotoModel> GetPhotoAsync(string photoId)
        {
            return await _context.Photos
                .Find(x => x.PhotoId == photoId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<PhotoModel>> GetPhotosByUserIdAsync(string userId, int pageSize, int pageIndex)
        {
            return await _context.Photos
                .Find(x => x.UserId == userId)
                .SortBy(x => x.CreateDate)
                .ThenBy(x => x.PhotoId)
                .Page(pageIndex, pageSize)
                .ToListAsync();
        }

        public async Task<long> GetTotalPhotosByUserIdAsync(string userId)
        {
            return await _context.Photos.CountDocumentsAsync(x => x.UserId == userId);
        }

        public async Task<List<PhotoModel>> GetPhotosByAlbumIdAsync(string albumId, int pageSize, int pageIndex)
        {
            var photoAlbums = await _context.PhotoAlbums
                .Find(x => x.AlbumId == albumId)
                .SortBy(x => x.CreateDate)
                .ThenBy(x => x.PhotoId)
                .Page(pageIndex, pageSize)
                .ToListAsync();

            var photoIds = photoAlbums.Select(y => y.PhotoId);
            var photos = await _context.Photos
                .Find(x => photoIds.Contains(x.PhotoId))
                .ToListAsync();

            return photos.Join(photoAlbums, p => p.PhotoId, pa => pa.PhotoId,
                    (p, pa) => new PhotoModel
                    {
                        PhotoId = p.PhotoId,
                        UserId = p.UserId,
                        CreateDate = pa.CreateDate,
                        Name = p.Name,
                        Description = p.Description,
                        Size = p.Size,
                        PublicId = p.PublicId,
                        Path = p.Path
                    }
                )
                .OrderBy(x => x.CreateDate)
                .ThenBy(x => x.PhotoId)
                .ToList();
        }

        public async Task<long> GetTotalPhotosByAlbumIdAsync(string albumId)
        {
            return await _context.PhotoAlbums.CountDocumentsAsync(x => x.AlbumId == albumId);
        }

        public async Task AddPhotosAsync(List<PhotoModel> photos)
        {
            var tasks = photos.Select(async photoModel => await AddPhotoAsync(photoModel));
            await Task.WhenAll(tasks);
        }

        public async Task AddPhotoAsync(PhotoModel photo)
        {
            (photo.PublicId, photo.Path) = await Task.Run(() => AddPhotoToCloud(photo));
            photo.CreateDate = DateTime.Now;
            await _context.Photos.InsertOneAsync(photo);
            await AddAlbumsToPhotoAsync(photo.AlbumIds, photo.PhotoId);
        }

        public async Task EditPhotoAsync(PhotoModel photo)
        {
            var update = Builders<PhotoModel>.Update
                .Set(x => x.Name, photo.Name)
                .Set(x => x.Description, photo.Description)
                .Set(x => x.Size, photo.Size)
                .Set(x => x.PublicId, await GetPublicId(photo.PhotoId))
                .Set(x => x.Path, await Task.Run(() => AddPhotoToCloud(photo).Path));

            await _context.Photos.UpdateOneAsync(x => x.PhotoId == photo.PhotoId, update);
            await UpdateAlbumsForPhotoAsync(photo.AlbumIds, photo.PhotoId);
        }

        public async Task DeletePhotoAsync(string photoId, string albumId)
        {
            if (albumId == null)
            {
                await Task.WhenAll(new List<Task>
                {
                    _context.PhotoAlbums.DeleteManyAsync(x => x.PhotoId == photoId),
                    Task.Run(async() => _сloudinary.DeleteResources(await GetPublicId(photoId))),
                    _context.Photos.DeleteOneAsync(x => x.PhotoId == photoId)
                });
            }
            else
            {
                await _context.PhotoAlbums.DeleteManyAsync(x => x.PhotoId == photoId && x.AlbumId == albumId);
            }
        }

        private async Task AddAlbumsToPhotoAsync(List<string> albumIds, string photoId)
        {
            if (!albumIds.Any())
            {
                return;
            }

            var addedAlbumIds = await _context.PhotoAlbums
                .Find(x => x.PhotoId == photoId && albumIds.Contains(x.AlbumId))
                .Project(x => x.AlbumId)
                .ToListAsync();

            var notAddedAlbumIds = new List<string>();

            foreach (var albumId in albumIds)
            {
                var pa = addedAlbumIds.FirstOrDefault(x => x == albumId);
                if (pa == null)
                {
                    notAddedAlbumIds.Add(albumId);
                }
            }

            var photoAlbums = albumIds.Select(albumId => new PhotoAlbumModel(photoId, albumId, DateTime.Now));
            await _context.PhotoAlbums.InsertManyAsync(photoAlbums);
        }

        private async Task UpdateAlbumsForPhotoAsync(List<string> albumIds, string photoId)
        {
            await _context.PhotoAlbums.DeleteManyAsync(x => x.PhotoId == photoId && !albumIds.Contains(x.AlbumId));

            if (!albumIds.Any())
            {
                return;
            }

            var photoAlbums = albumIds.Select(albumId => new PhotoAlbumModel(photoId, albumId, DateTime.Now));
            await _context.PhotoAlbums.InsertManyAsync(photoAlbums);
        }

        private (string PublicId, string Path) AddPhotoToCloud(PhotoModel photo)
        {
            var stream = new MemoryStream(Convert.FromBase64String(Regex.Match(
                photo.Base64, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value));

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(photo.Name, stream),
                PublicId = photo.PublicId
            };

            var uploadResult = _сloudinary.Upload(uploadParams);
            return (PublicId: uploadResult.PublicId, Path: uploadResult.SecureUri.ToString());
        }

        private async Task<string> GetPublicId(string photoId)
        {
            return await _context.Photos
                .Find(x => x.PhotoId == photoId)
                .Project(x => x.PublicId)
                .FirstOrDefaultAsync();
        }
    }
}
