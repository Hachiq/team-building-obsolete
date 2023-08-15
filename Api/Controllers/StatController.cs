using Api.Models;
using Api.Services.StatService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatController : ControllerBase
    {
        private readonly IStatService _statService;

        public StatController(IStatService statService)
        {
            _statService = statService;
        }

        [HttpGet("get")]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _statService.GetUserStats());
        }
    }
}
