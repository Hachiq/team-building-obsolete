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

        public async Task<Request> GetRequestByIdAsync(int id)
        {
            return await _db.Requests.FirstOrDefaultAsync(request => request.Id == id);
        }

        public async Task<IEnumerable<Request>> GetRequestsByTeamIdAsync(int teamId)
        {
            return await _db.Requests
                .Where(request => request.TeamId == teamId)
                .Include(request => request.User)
                .Include(request => request.Team)
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

        public bool AlreadyProcessed(Request request)
        {
            return request.Status == "Accepted" || request.Status == "Declined";
        }

        public async Task DeclineRequestAsync(Request request)
        {
            request.Status = "Declined";
            _db.Update(request);
            await _db.SaveChangesAsync();
        }
        public async Task AcceptRequestAsync(Request request)
        {
            request.Status = "Accepted";
            _db.Update(request);
            await _db.SaveChangesAsync();
        }
    }
}
