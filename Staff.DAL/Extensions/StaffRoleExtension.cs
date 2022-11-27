using Staff.Common.Dtos.Auth;
using System.ComponentModel;

namespace Staff.DAL.Extensions
{
    public static class StaffRoleExtension
    {
        public static string ToDescriptionString(this StaffRoles role)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[])role
               .GetType()
               .GetField(role.ToString())
               .GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attributes.Length > 0 ? attributes[0].Description : string.Empty;
        }
    }
}
