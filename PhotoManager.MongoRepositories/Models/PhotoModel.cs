using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PhotoManager.MongoRepositories.Validation;

namespace PhotoManager.MongoRepositories.Models
{
    public class PhotoModel
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string PhotoId { get; set; }

        public string UserId { get; set; }

        [BsonIgnore]
        public string Base64 { get; set; }

        [Required(ErrorMessage = "Please input name!")]
        [StringLength(25, ErrorMessage = "Name should be no more {2} symbols!")]
        [IsNotTagOrScript(ErrorMessage = "Name shouldn\'t be a tag or script!")]
        public string Name { get; set; }

        [StringLength(500, ErrorMessage = "Description should be no more {2} symbols!")]
        [IsNotTagOrScript(ErrorMessage = "Description shouldn\'t be a tag or script!")]
        public string Description { get; set; }

        public DateTime CreateDate { get; set; }

        public int Size { get; set; }

        public string PublicId { get; set; }

        public string Path { get; set; }

        [BsonIgnore]
        public List<string> AlbumIds { get; set; }

        [BsonIgnore]
        public List<(string AlbumId, string Name)> Albums { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
