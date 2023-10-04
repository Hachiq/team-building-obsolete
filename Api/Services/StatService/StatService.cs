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

        public async Task<Stat> GetStatByUserIdAsync(int id)
        {
            return await _db.Stats.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<User>> GetUserStatsAsync()
        {
            return await _db.Users.Include(u => u.Stat).ToListAsync();
        }

        public async Task SetSalaryAsync(User user, int newSalary)
        {
            user.Stat.Salary = newSalary;
            _db.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task AddDayWorkedAsync(User user)
        {
            user.Stat.DaysWorked += 1;
            _db.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task AddDayPaidAsync(User user)
        {
            user.Stat.DaysPaid += 1;
            _db.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task ClearStatsAsync(User user)
        {
            user.Stat.DaysPaid = 0;
            user.Stat.DaysWorked = 0;
            user.Stat.Salary = 0;
            _db.Update(user);
            await _db.SaveChangesAsync();
        }
    }
}
