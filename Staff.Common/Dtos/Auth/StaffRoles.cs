using System.ComponentModel;

namespace Staff.Common.Dtos.Auth
{
    public enum StaffRoles
    {
        [Description("Cook")]
        Cook,

        [Description("Barkeep")]
        Barkeep,

        [Description("Waiter")]
        Waiter
    }
}
