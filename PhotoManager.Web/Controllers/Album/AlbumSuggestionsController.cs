using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Album
{
    [Authorize, Route("api"), ApiController]
    public class AlbumSuggestionsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AlbumRepository _albumRepository;

        public AlbumSuggestionsController(ILogger<AlbumSuggestionsController> logger, AlbumRepository albumRepository)
        {
            _logger = logger;
            _albumRepository = albumRepository;
        }

        [HttpGet("album-suggestions")]
        public async Task<IActionResult> Get(string userId, int maxSuggestions, string search)
        {
            var albumSuggestions = await _albumRepository.GetAlbumSuggestionsAsync(userId, maxSuggestions, search);
            _logger.LogInformation($"Album suggestions for userId={userId} were successfully received, maxSuggestions={maxSuggestions}, search={search}.");

            return Ok(albumSuggestions);
        }
    }
}