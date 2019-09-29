using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PhotoManager.MongoRepositories.Validation;

namespace PhotoManager.MongoRepositories.Models
{
    public class AlbumModel
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string AlbumId { get; set; }

        public string UserId { get; set; }

        [Required(ErrorMessage = "Please input name!")]
        [StringLength(25, ErrorMessage = "Name should be no more {2} symbols!")]
        [IsNotTagOrScript(ErrorMessage = "Name shouldn\'t be a tag or script!")]
        public string Name { get; set; }

        [StringLength(500, ErrorMessage = "Description should be no more {2} symbols!")]
        [IsNotTagOrScript(ErrorMessage = "Description shouldn\'t be a tag or script!")]
        public string Description { get; set; }

        public DateTime CreateDate { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
