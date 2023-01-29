using Staff.Common.Dtos.Auth;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.Common.Dtos.AppUser
{
    public class UpdateWorkUser
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public StaffRoles Role { get; set; }

        public string Password { get; set; }

        [Compare(nameof(Password))]
        public string Confirm { get; set; }
    }
}
