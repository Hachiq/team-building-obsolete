using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.StatService
{
    public class StatService : IStatService
    {
        private readonly AppDbContext _db;
        public StatService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Stat> GetStatByUserAsync(User user)
        {
            return await _db.Stats.FirstOrDefaultAsync(s => s.Id == user.Id);
        }

        public async Task<IEnumerable<User>> GetUserStatsAsync()
        {
            return await _db.Users.Include(u => u.Stat).ToListAsync();
        }
    }
}
