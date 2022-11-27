using Microsoft.AspNetCore.Identity;

namespace Staff.DAL.Seeds
{
    public class RolesSeed
    {
        public static async Task Seed(StaffDbContext context)
        {
            if (context.Roles.Count() <= 1)
            {
                context.Roles.AddRange(
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                    new IdentityRole { Name = "Manager", NormalizedName = "MANAGER" },
                    new IdentityRole { Name = "Waiter", NormalizedName = "WAITER" },
                    new IdentityRole { Name = "Barkeep", NormalizedName = "BARKEEP" },
                    new IdentityRole { Name = "Cook", NormalizedName = "COOK" }
                    );

                await context.SaveChangesAsync();
            }
        }
    }
}
