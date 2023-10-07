﻿using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Stat> Stats => Set<Stat>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<Team> Teams => Set<Team>();
        public DbSet<Request> Requests => Set<Request>();
        public DbSet<Status> Statuses => Set<Status>();
    }
}
