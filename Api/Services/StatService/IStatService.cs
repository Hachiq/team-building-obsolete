using Api.Models;

namespace Api.Services.StatService
{
    public interface IStatService
    {
        Task<IEnumerable<User>> GetUserStatsAsync();
        Task<Stat> GetStatByUserAsync(User user);
    }
}
