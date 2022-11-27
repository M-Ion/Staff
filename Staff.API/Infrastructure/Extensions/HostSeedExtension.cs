using Microsoft.EntityFrameworkCore;
using Staff.DAL;
using Staff.DAL.Seeds;

namespace Staff.API.Infrastructure.Extensions
{
    public static class HostSeedExtension
    {
        public static async Task SeedData(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var context = services.GetRequiredService<StaffDbContext>();

                    context.Database.Migrate();

                    await RolesSeed.Seed(context);
                }
                catch (Exception e)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(e, e.ToString());
                }
            }
        }
    }
}
