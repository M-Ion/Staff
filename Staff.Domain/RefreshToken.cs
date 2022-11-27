using System.ComponentModel.DataAnnotations;

namespace Staff.Domain
{
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; }

        public string AppUserId { get; set; }

        public string Value { get; set; }

        public string JwtId { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime Expires { get; set; }
    }
}
