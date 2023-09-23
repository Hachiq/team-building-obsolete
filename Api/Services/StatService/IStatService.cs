using Api.Models;

namespace Api.Services.StatService
{
    public interface IStatService
    {
        Task<IEnumerable<User>> GetUserStatsAsync();
        Task<Stat> GetStatByUserAsync(User user);
        Task SetSalaryAsync(User user, int newSalary);
        Task AddDayWorkedAsync(User user);
        Task AddDayPaidAsync(User user);
        Task ClearStatsAsync(User user);
    }
}
