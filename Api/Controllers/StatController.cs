using Api.DTOs;
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

        [HttpGet("{username}")]
        public async Task<ActionResult<Stat>> GetStatByUser(string username)
        {
            var user = _userService.GetUserByUsername(username);
            if (user is null)
            {
                return NotFound("User not found");
            }
            var stat = await _statService.GetStatByUserAsync(user);
            if (stat is null)
            {
                return NotFound("Stat not found");
            }
            return Ok(stat);
        }

        [HttpPut("set")]
        public async Task<ActionResult> SetSalary(NewSalaryDto salary)
        {
            User user = _userService.GetUserByUsername(salary.Username);
            if (user is null)
            {
                return NotFound("User not found");
            }
            await _statService.SetSalaryAsync(user, salary.NewSalary);
            return Ok();
        }

        [HttpPut("add")]
        public async Task<ActionResult> AddDayWorked(MemberDto member)
        {
            User user = _userService.GetUserByUsername(member.Username);
            if (user is null)
            {
                return NotFound("User not found");
            }
            await _statService.AddDayWorkedAsync(user);
            return Ok();
        }
    }
}
