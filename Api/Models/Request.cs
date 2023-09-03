namespace Api.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime RequestDate { get; set; } = DateTime.Now;

        public User? User { get; set; }
        public Team? Team { get; set; }
    }
}
