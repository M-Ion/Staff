using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Auth
{
    public class RegisterStaffDto : BaseRegisterDto
    {
        [Required]
        public string CompanyId { get; set; }

        [Required]
        public StaffRoles Role { get; set; }

    }
}
