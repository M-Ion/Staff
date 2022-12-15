using Microsoft.AspNetCore.Identity;
using Staff.Common.Dtos.Auth;
using Staff.DAL.Contracts;
using Staff.Domain.Users;
using System.ComponentModel.DataAnnotations;

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

            if (result.Errors.Any())
            {
                foreach (IdentityError error in result.Errors)
                {
                    switch (error.Code)
                    {
                        case "DuplicateUserName":
                            throw new ValidationException("The email is already taken, try another one.");
                        default:
                            throw new ValidationException(error.Description);
                    }
                }
            }

            return result.Errors;
        }

        public async Task<IEnumerable<IdentityError>> Register(WorkerUser user, string password, string role)
        {
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            if (result.Errors.Any())
            {
                foreach (IdentityError error in result.Errors)
                {
                    switch (error.Code)
                    {
                        case "DuplicateUserName":
                            throw new ValidationException("The email is already taken, try another one.");
                        default:
                            throw new ValidationException(error.Description);
                    }
                }
            }

            return result.Errors;
        }

        public async Task<AppUser> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null)
            {
                throw new ValidationException("Incorrect email.");
            }

            bool valid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!valid)
            {
                throw new ValidationException("Incorrect password.");
            }

            return user;
        }

    }
}
