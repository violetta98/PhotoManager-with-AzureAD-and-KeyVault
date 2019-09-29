using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Photo
{
    [Authorize, Route("api"), ApiController]
    public class AlbumPhotosController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AlbumRepository _albumRepository;
        private readonly PhotoRepository _photoRepository;

        public AlbumPhotosController(ILogger<AlbumPhotosController> logger, AlbumRepository albumRepository, PhotoRepository photoRepository)
        {
            _logger = logger;
            _albumRepository = albumRepository;
            _photoRepository = photoRepository;
        }

        [HttpGet("albums/{albumId}/photos")]
        public async Task<IActionResult> Get(string albumId, int pageSize, int pageIndex)
        {
            var photos = await _photoRepository.GetPhotosByAlbumIdAsync(albumId, pageSize, pageIndex);
            foreach (var photo in photos)
            {
                photo.Albums = await _albumRepository.GetAlbumsAsync(photo.PhotoId);
            }

            var totalPhotos = await _photoRepository.GetTotalPhotosByAlbumIdAsync(albumId);
            _logger.LogInformation($"Photos for albumId={albumId} was successfully received, pageSize={pageSize}, pageIndex={pageIndex}.");

            return Ok(new { photos, totalPhotos });
        }
    }
}