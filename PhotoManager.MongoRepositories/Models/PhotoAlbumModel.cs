using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoManager.MongoRepositories.Models
{
    public class PhotoAlbumModel
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string PhotoAlbumId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string PhotoId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string AlbumId { get; set; }

        public DateTime CreateDate { get; set; }

        public PhotoAlbumModel()
        {
        }

        public PhotoAlbumModel(string photoId, string albumId, DateTime createDate)
        {
            PhotoId = photoId;
            AlbumId = albumId;
            CreateDate = createDate;
        }
    }
}
