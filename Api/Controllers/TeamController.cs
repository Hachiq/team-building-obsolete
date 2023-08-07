using Api.DTOs;
using Api.Models;
using Api.Services.TeamService;
using Api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private readonly IUserService _userService;

        public TeamController(ITeamService teamService, IUserService userService)
        {
            _teamService = teamService;
            _userService = userService;
        }

        [HttpGet("get")]
        public async Task<ActionResult<List<Team>>> Get()
        {
            return Ok(await _teamService.GetTeamsAsync());
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add(TeamDto request)
        {
            await _teamService.AddTeamAsync(new Team
            {
                Name = request.Team,
                Users = new List<User> { _userService.GetUserByUsername(request.User) }
            });
            return Ok();
        }
    }
}
