using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Auth
{
    public class RegisterManagerDto : BaseRegisterDto
    {
        [Required]
        public string CompanyName { get; set; }
    }
}
