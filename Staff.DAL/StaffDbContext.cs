using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Staff.DAL.Configs;
using Staff.Domain;
using Staff.Domain.Users;

namespace Staff.DAL
{
    public class StaffDbContext : IdentityDbContext<AppUser>
    {
        public StaffDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new OrderConfig());
        }
    }
}
