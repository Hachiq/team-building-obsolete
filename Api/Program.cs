using Api.Data;
using Api.Services.UserService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var identityConnectionString = builder.Configuration.
    GetConnectionString("AppIdentityDbContextConnection")
    ?? throw new InvalidOperationException("Connection string 'AppIdentityDbContextConnection' not found.");

// Add services to the container.

builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(identityConnectionString));

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy(name: "AllowAngular",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
                }));

var app = builder.Build();

app.UseCors("AllowAngular");

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
