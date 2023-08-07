using Api.Data;
using Api.DTOs;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _db;

        public UserService(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _db.Users.ToListAsync();
        }
        public User GetUserByUsername(string username)
        {
            User user = _db.Users.FirstOrDefault(u => u.Username == username);
            return user;
        }
        public string GetUserRole(User user)
        {
            var role = _db.Roles.FirstOrDefault(r => r.Id == user.RoleId);
            return role.RoleName;
        }
        public bool IsUsernameUnique(UserDto request)
        {
            User user = _db.Users.FirstOrDefault(u => u.Username == request.Username);
            return user is null;
        }
        public bool IsEmailUnique(UserDto request)
        {
            User user = _db.Users.FirstOrDefault(u => u.Email == request.Email);
            return user is null;
        }
        public async Task AddUserAsync(User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
        }
    }
}
