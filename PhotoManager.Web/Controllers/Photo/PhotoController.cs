using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Photo
{
    [Authorize, Route("api"), ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AlbumRepository _albumRepository;
        private readonly PhotoRepository _photoRepository;

        public PhotoController(ILogger<PhotoController> logger, AlbumRepository albumRepository, PhotoRepository photoRepository)
        {
            _logger = logger;
            _albumRepository = albumRepository;
            _photoRepository = photoRepository;
        }

        [HttpGet("photos/{photoId}")]
        public async Task<IActionResult> Get(string photoId)
        {
            var photo = await _photoRepository.GetPhotoAsync(photoId);

            if (photo == null)
            {
                _logger.LogWarning($"Photo with photoId={photoId} was not found.");
                return NotFound();
            }

            photo.Albums = await _albumRepository.GetAlbumsAsync(photoId);
            _logger.LogInformation($"Photo with photoId={photoId} was successfully received.");

            return Ok(photo);
        }

        [HttpPost("photos")]
        public async Task<IActionResult> Post([FromBody]List<PhotoModel> photos)
        {
            await _photoRepository.AddPhotosAsync(photos);
            _logger.LogInformation($"Photos {JsonConvert.SerializeObject(photos)} were successfully added.");

            return Ok();
        }

        [HttpPatch("photos")]
        public async Task<IActionResult> Patch(PhotoModel photo)
        {
            await _photoRepository.EditPhotoAsync(photo);
            _logger.LogInformation($"Photo {photo} were successfully added.");

            return Ok();
        }

        [HttpDelete("photos/{photoId}")]
        public async Task<IActionResult> Delete(string photoId, string albumId)
        {
            await _photoRepository.DeletePhotoAsync(photoId, albumId);
            _logger.LogInformation($"Photo with photoId={photoId} was successfully deleted from album with albumId={albumId}.");

            return Ok();
        }
    }
}