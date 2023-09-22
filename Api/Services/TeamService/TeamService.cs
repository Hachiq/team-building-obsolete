using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.TeamService
{
    public class TeamService : ITeamService
    {
        private readonly AppDbContext _db;

        public TeamService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Team>> GetTeamsAsync()
        {
            return await _db.Teams.Include(t => t.Users).ToListAsync();
        }

        public async Task AddTeamAsync(Team team)
        {
            await _db.Teams.AddAsync(team);
            await _db.SaveChangesAsync();
        }

        public async Task AddTeamMemberAsync(Team team, User user)
        {
            team.Users.Add(user);
            _db.Update(team);
            await _db.SaveChangesAsync();
        }

        public async Task RemoveTeamMemberAsync(User user)
        {
            user.TeamId = null;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task<List<User>> GetTeamMembersAsync(int teamId)
        {
            Team team = await _db.Teams.Include(t => t.Users).FirstOrDefaultAsync(u => u.Id == teamId);
            return team.Users.ToList();
        }

        public async Task<Team> GetTeamByTeamNameAsync(string teamName)
        {
            Team team = await _db.Teams.FirstOrDefaultAsync(u => u.Name == teamName);
            return team;
        }

        public async Task<Team> GetTeamByUserAsync(User user)
        {
            return await _db.Teams.Include(t => t.Users).FirstOrDefaultAsync(t => t.Id == user.TeamId);
        }

        public async Task<bool> TeamExists(int teamId)
        {
            return await _db.Teams.AnyAsync(t => t.Id == teamId);
        }
    }
}
