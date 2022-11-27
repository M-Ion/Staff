using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Staff.Domain.Users
{
    public class AppUser : IdentityUser
    {
        [Required]
        public virtual Company Company { get; set; }

        [Required]
        public string FullName { get; set; }

        public virtual RefreshToken RefreshToken { get; set; }
    }
}
