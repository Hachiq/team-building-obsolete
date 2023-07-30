using Api.DTOs;
using Api.Models;

namespace Api.Services.UserService;

public interface IUserService
{
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User> GetUserByUsernameAsync(string username);
    Task AddUserAsync(User user);
    string GetUserRole(User user);
    bool IsUsernameUnique(UserDto request);
    bool IsEmailUnique(UserDto request);
}
