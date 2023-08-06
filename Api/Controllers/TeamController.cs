using Api.Models;
using Api.Services.TeamService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet("get")]
        public async Task<ActionResult<List<Team>>> Get()
        {
            return Ok(await _teamService.GetTeamsAsync());
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add(Team team)
        {
            await _teamService.AddTeamAsync(team);
            return Ok();
        }
    }
}
