using Api.Models;
using Api.Services.StatService;
using Api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatController : ControllerBase
    {
        private readonly IStatService _statService;
        private readonly IUserService _userService;

        public StatController(IStatService statService, IUserService userService)
        {
            _statService = statService;
            _userService = userService;
        }

        [HttpGet("get")]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _statService.GetUserStatsAsync());
        }

        [HttpGet("single")]
        public async Task<ActionResult<Stat>> GetStat()
        {
            var username = "Hachiq"; // Fix endpoints
            var user = _userService.GetUserByUsername(username);
            return Ok(await _statService.GetStatByUserAsync(user));
        }
    }
}
