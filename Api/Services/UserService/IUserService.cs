using Api.Models;

namespace Api.Services.UserService;

public interface IUserService
{
    Task<IEnumerable<User>> GetUsersAsync();
}
