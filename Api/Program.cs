using Api.Data;
using Api.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var appConnectionString = builder.Configuration.
    GetConnectionString("AppDbContextConnection")
    ?? throw new InvalidOperationException("Connection string 'AppDbContextConnection' not found.");

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(appConnectionString));

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy(name: "AllowAngular",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
                }));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

app.UseCors("AllowAngular");

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
