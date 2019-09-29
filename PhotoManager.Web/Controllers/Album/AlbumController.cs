using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Album
{
    [Authorize, Route("api"), ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AlbumRepository _albumRepository;
        private readonly PhotoRepository _photoRepository;

        public AlbumController(ILogger<AlbumController> logger, AlbumRepository albumRepository, PhotoRepository photoRepository)
        {
            _logger = logger;
            _albumRepository = albumRepository;
            _photoRepository = photoRepository;
        }

        [HttpGet("albums/{albumId}")]
        public async Task<IActionResult> Get(string albumId, int pageSize, int pageIndex)
        {
            var album = await _albumRepository.GetAlbumAsync(albumId);

            if (album == null)
            {
                _logger.LogWarning($"Album with albumId={albumId} was not found.");
                return NotFound();
            }

            var photos = await _photoRepository.GetPhotosByAlbumIdAsync(albumId, pageSize, pageIndex);
            foreach (var photo in photos)
            {
                photo.Albums = await _albumRepository.GetAlbumsAsync(photo.PhotoId);
            }

            var totalPhotos = await _photoRepository.GetTotalPhotosByAlbumIdAsync(albumId);
            _logger.LogInformation($"Album with albumId={albumId} was successfully received with photos, pageSize={pageSize}, pageIndex={pageIndex}.");

            return Ok(new { album, photos, totalPhotos } );
        }

        [HttpPost("albums")]
        public async Task<IActionResult> Post(AlbumModel album)
        {
            if (await _albumRepository.AddAlbumAsync(album))
            {
                _logger.LogInformation($"Album {album} was successfully added.");
                return Ok();
            }

            _logger.LogWarning($"Adding album was failed. Album with name={album.Name} already exists for user with userId={album.UserId}.");
            return Conflict();
        }

        [HttpPatch("albums")]
        public async Task<IActionResult> Patch(AlbumModel album)
        {
            if (await _albumRepository.EditAlbumAsync(album))
            {
                _logger.LogInformation($"Album {album} was successfully edited.");
                return Ok();
            }

            _logger.LogWarning($"Editing album was failed. Album with name={album.Name} already exists for user with userId={album.UserId}.");
            return Conflict();
        }

        [HttpDelete("albums/{albumId}")]
        public async Task<IActionResult> Delete(string albumId)
        {
            await _albumRepository.DeleteAlbumAsync(albumId);
            _logger.LogInformation($"Album with albumId={albumId} was successfully deleted.");

            return Ok();
        }
    }
}