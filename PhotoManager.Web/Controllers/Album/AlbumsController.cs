using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Album
{
    [Authorize, Route("api"), ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AlbumRepository _albumRepository;

        public AlbumsController(ILogger<AlbumsController> logger, AlbumRepository albumRepository)
        {
            _logger = logger;
            _albumRepository = albumRepository;
        }

        [HttpGet("albums")]
        public async Task<IActionResult> Get(string userId, int pageSize, int pageIndex)
        {
            var albums = await _albumRepository.GetAlbumsAsync(userId, pageSize, pageIndex);
            var totalAlbums = await _albumRepository.GetTotalAlbumsAsync(userId);
            _logger.LogInformation($"Albums for userId={userId} were successfully received, pageSize={pageSize}, pageIndex={pageIndex}.");

            return Ok(new { albums, totalAlbums });
        }
    }
}