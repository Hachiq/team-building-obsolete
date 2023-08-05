using Api.DTOs;
using Api.Models;

namespace Api.Services.TeamService
{
    public interface ITeamService
    {
        Task<IEnumerable<Team>> GetTeamsAsync();
        Task AddTeamAsync(Team team);
    }
}
