using Microsoft.AspNetCore.Identity;
using Staff.Common.Dtos.Auth;
using Staff.DAL.Contracts;
using Staff.Domain.Users;

namespace Staff.DAL.Repositories.Auth
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<AppUser> _userManager;

        public AuthManager(
            UserManager<AppUser> userManager
            )
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<IdentityError>> Register(AppUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Manager");
            }

            if (result.Errors.Any()) throw new Exception();

            return result.Errors;
        }

        public async Task<IEnumerable<IdentityError>> Register(WorkerUser user, string password, string role)
        {
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            return result.Errors;
        }

        public async Task<AppUser> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null)
            {
                throw new Exception();
            }

            bool valid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!valid)
            {
                throw new Exception();
            }

            return user;
        }

    }
}
