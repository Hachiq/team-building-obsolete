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
        public async Task<IEnumerable<User>> GetUserStats()
        {
            return await _db.Users.Include(u => u.Stat).ToListAsync();
        }
    }
}
