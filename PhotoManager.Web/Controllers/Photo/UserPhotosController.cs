using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Photo
{
    [Authorize, Route("api"), ApiController]
    public class UserPhotosController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AlbumRepository _albumRepository;
        private readonly PhotoRepository _photoRepository;

        public UserPhotosController(ILogger<UserPhotosController> logger, AlbumRepository albumRepository, PhotoRepository photoRepository)
        {
            _logger = logger;
            _albumRepository = albumRepository;
            _photoRepository = photoRepository;
        }

        [HttpGet("users/{userId}/photos")]
        public async Task<IActionResult> Get(string userId, int pageSize, int pageIndex)
        {
            var photos = await _photoRepository.GetPhotosByUserIdAsync(userId, pageSize, pageIndex);
            foreach (var photo in photos)
            {
                photo.Albums = await _albumRepository.GetAlbumsAsync(photo.PhotoId);
            }

            var totalPhotos = await _photoRepository.GetTotalPhotosByUserIdAsync(userId);
            _logger.LogInformation($"Photos for userId={userId} was successfully received, pageSize={pageSize}, pageIndex={pageIndex}.");

            return Ok(new { photos, totalPhotos });
        }
    }
}