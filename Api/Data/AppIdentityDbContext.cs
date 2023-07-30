using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class AppIdentityDbContext : DbContext
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options) { }
        
        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
    }
}
