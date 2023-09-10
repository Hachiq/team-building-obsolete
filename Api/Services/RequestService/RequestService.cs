using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.RequestService
{
    public class RequestService : IRequestService
    {
        private readonly AppDbContext _db;
        public RequestService(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<Request>> GetAllRequestsAsync()
        {
            return await _db.Requests.ToListAsync();
        }
        public async Task<IEnumerable<Request>> GetRequestsByTeamIdAsync(int teamId)
        {
            return await _db.Requests
                .Where(request => request.TeamId == teamId)
                .Include(request => request.User)
                .ToListAsync();
        }
        public async Task CreateRequestAsync(int userId, int teamId)
        {
            await _db.Requests.AddAsync(new Request
            {
                UserId = userId,
                TeamId = teamId
            });
            await _db.SaveChangesAsync();
        }
    }
}
