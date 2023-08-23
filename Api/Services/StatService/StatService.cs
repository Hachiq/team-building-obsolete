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
            return user.Stat;
            //return await _db.Stats.FirstOrDefaultAsync(s => s.Id == user.Id);
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
    }
}
