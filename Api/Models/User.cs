using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int RoleId { get; set; }
        public int? TeamId { get; set; }
        public Team? Team { get; set; }
        public Stat Stat { get; set; } = new Stat();
    }
}
