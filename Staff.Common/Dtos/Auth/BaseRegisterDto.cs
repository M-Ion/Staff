using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Auth
{
    public class BaseRegisterDto
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password))]
        public string Confirm { get; set; }
    }
}
