using Api.Models;

namespace Api.Services.StatService
{
    public interface IStatService
    {
        Task<IEnumerable<User>> GetUserStats();
    }
}
