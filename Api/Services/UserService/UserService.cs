using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly AppIdentityDbContext _db;

        public UserService(AppIdentityDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _db.Users.ToListAsync();
        }
    }
}
