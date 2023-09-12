﻿using Api.Models;

namespace Api.Services.RequestService
{
    public interface IRequestService
    {
        Task<IEnumerable<Request>> GetAllRequestsAsync();
        Task<Request> GetRequestByIdAsync(int id);
        Task<IEnumerable<Request>> GetRequestsByTeamIdAsync(int teamId);
        Task CreateRequestAsync(int userId, int teamId);
    }
}
