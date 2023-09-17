using Api.DTOs;
using Api.Models;
using Api.Services.RequestService;
using Api.Services.TeamService;
using Api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;
        private readonly ITeamService _teamService;
        private readonly IUserService _userService;

        public RequestController(IRequestService requestService, ITeamService teamService, IUserService userService)
        {
            _requestService = requestService;
            _teamService = teamService;
            _userService = userService;
        }

        [HttpGet("get-all")]
        public async Task<ActionResult<List<Request>>> GetAllRequests()
        {
            return Ok(await _requestService.GetAllRequestsAsync());
        }
        [HttpGet("get/{teamId}")]
        public async Task<ActionResult<List<Request>>> GetRequests(int teamId)
        {
            return Ok(await _requestService.GetRequestsByTeamIdAsync(teamId));
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateRequest(TeamDto data)
        {
            var team = await _teamService.GetTeamByTeamNameAsync(data.Team);
            if (team is null)
            {
                return BadRequest("Something went wrong. Team doesn`t exist.");
            }
            var user = await _userService.GetUserByUsername(data.User);
            if (user is null)
            {
                return BadRequest("Something went wrong. User doesn`t exist.");
            }
            if (user.TeamId is not null)
            {
                return BadRequest("Something went wrong. Make sure you are not a member of a team already.");
            }
            await _requestService.CreateRequestAsync(user.Id, team.Id);
            return Ok();
        }

        [HttpPut("decline/{id}")]
        public async Task<ActionResult> DeclineRequest(int id)
        {
            var request = await _requestService.GetRequestByIdAsync(id);

            if (request is null)
            {
                return BadRequest("Request not found");
            }
            if (_requestService.AlreadyProcessed(request))
            {
                return BadRequest("Request was already processed");
            }

            await _requestService.DeclineRequestAsync(request);

            return Ok();
        }

        [HttpPut("accept/{id}")]
        public async Task<ActionResult> AcceptRequest(int id)
        {
            var request = await _requestService.GetRequestByIdAsync(id);

            if (request is null)
            {
                return BadRequest("Request not found");
            }
            if (_requestService.AlreadyProcessed(request))
            {
                return BadRequest("Request was already processed");
            }

            await _requestService.AcceptRequestAsync(request);

            return Ok();
        }
    }
}
