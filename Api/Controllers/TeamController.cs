using Api.DTOs;
using Api.Models;
using Api.Services.RequestService;
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
        private readonly IRequestService _requestService;

        public TeamController(ITeamService teamService, IUserService userService, IRequestService requestService)
        {
            _teamService = teamService;
            _userService = userService;
            _requestService = requestService;
        }

        [HttpGet("get")]
        public async Task<ActionResult<List<Team>>> Get()
        {
            return Ok(await _teamService.GetTeamsAsync());
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add(TeamDto request)
        {
            var user = await _userService.GetUserByUsername(request.User);
            if (user == null || user.TeamId is not null) 
            {
                return BadRequest("Something went wrong. Make sure you are not a member of a team already.");
            }
            await _teamService.AddTeamAsync(new Team
            {
                Name = request.Team,
                Users = new List<User> { user }
            });
            return Ok();
        }

        [HttpDelete("remove-user-from-team/{username}")]
        public async Task<ActionResult> RemoveTeamMember(string username)
        {
            var user = await _userService.GetUserByUsername(username);
            if (user == null || user.TeamId is null)
            {
                return BadRequest("Something went wrong. Make sure this user was a member of your team");
            }
            await _teamService.RemoveTeamMemberAsync(user);
            return Ok();
        }

        [HttpPut("join")]
        public async Task<ActionResult> Join(TeamDto request)
        {
            var team = await _teamService.GetTeamByTeamNameAsync(request.Team);
            if (request.Team == null)
            {
                return BadRequest("Something went wrong. It seems, this team does not exist.");
            }
            var user = await _userService.GetUserByUsername(request.User);
            if (user == null)
            {
                return BadRequest("Something went wrong. Make sure you are logged in.");
            }
            if (user.TeamId is not null)
            {
                return BadRequest("Something went wrong. It seems this user is already a member of a team.");
            }
            await _teamService.AddTeamMemberAsync(team, user);
            return Ok();
        }

        [HttpGet("single/{username}")]
        public async Task<ActionResult<Team>> GetTeamByUser(string username)
        {
            var user = await _userService.GetUserByUsername(username);
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
