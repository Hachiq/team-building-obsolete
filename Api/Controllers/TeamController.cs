using Api.DTOs;
using Api.Models;
using Api.Services.TeamService;
using Api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch.Internal;
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
            var user = _userService.GetUserByUsername(request.User);
            if (user == null || user.TeamId is not null) 
            {
                return BadRequest("Something went wrong. Make sure you are not a member of a team already");
            }
            await _teamService.AddTeamAsync(new Team
            {
                Name = request.Team,
                Users = new List<User> { user }
            });
            return Ok();
        }

        [HttpPut("join")]
        public async Task<ActionResult> Join(TeamDto request)
        {
            var team = _teamService.GetTeamByTeamNameAsync(request.Team);
            if (team == null)
            {
                return BadRequest("Something went wrong. It seems, this team does not exist");
            }
            var user = _userService.GetUserByUsername(request.User);
            if (user == null || user.TeamId is not null)
            {
                return BadRequest("Something went wrong. Make sure you are not a member of a team already.");
            }
            await _teamService.AddTeamMemberAsync(team, user);
            return Ok();
        }

        [HttpGet("single/{username}")]
        public async Task<ActionResult<Team>> GetTeamByUser(string username)
        {
            var user = _userService.GetUserByUsername(username);
            return Ok(await _teamService.GetTeamByUserAsync(user));
        }

        [HttpGet("members/{teamId}")]
        public async Task<ActionResult<List<User>>> GetTeamMemtbers(int teamId)
        {
            if (!await _teamService.TeamExists(teamId))
            {
                return NotFound("No such team exists");
            }
            return Ok(await _teamService.GetTeamMembersAsync(teamId));
        }
    }
}
