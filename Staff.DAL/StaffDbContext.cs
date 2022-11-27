using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Staff.Domain;
using Staff.Domain.Users;

namespace Staff.DAL
{
    public class StaffDbContext : IdentityDbContext<AppUser>
    {
        public StaffDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<WorkerUser> Staff { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
