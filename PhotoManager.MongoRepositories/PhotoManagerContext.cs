using MongoDB.Driver;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Options;

namespace PhotoManager.MongoRepositories
{
    public class PhotoManagerContext
    {
        private readonly IMongoDatabase _database;

        public PhotoManagerContext(MongoOptions mongoOptions)
        {
            var connection = new MongoUrlBuilder(mongoOptions.ConnectionString);
            var client = new MongoClient(mongoOptions.ConnectionString);
            _database = client.GetDatabase(connection.DatabaseName);
        }

        public IMongoCollection<PhotoModel> Photos => _database.GetCollection<PhotoModel>("photos");

        public IMongoCollection<AlbumModel> Albums => _database.GetCollection<AlbumModel>("albums");

        public IMongoCollection<PhotoAlbumModel> PhotoAlbums => _database.GetCollection<PhotoAlbumModel>("photo_albums");
    }
}
