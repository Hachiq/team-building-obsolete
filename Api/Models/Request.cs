namespace Api.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public int StatusId { get; set; } = 1;
        public DateTime RequestDate { get; set; } = DateTime.Now;

        public User? User { get; set; }
        public Team? Team { get; set; }
        public Status? Status { get; set; }

        public void Decline()
        {
            StatusId = 3;
        }
        public void Accept()
        {
            StatusId = 2;
        }
    }
}
