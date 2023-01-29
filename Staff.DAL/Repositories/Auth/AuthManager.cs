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

        public async Task<IEnumerable<IdentityError>> Update(AppUser user, string role = null, string password = null)
        {
            IEnumerable<IdentityError> result;

            var foundedUser = _userManager.FindByIdAsync(user.Id);

            if (foundedUser is null)
            {
                throw new Exception();
            }

            IdentityResult resultOnUpdate = await _userManager.UpdateAsync(user);

            if (resultOnUpdate.Errors.Any())
            {
                foreach (IdentityError error in resultOnUpdate.Errors)
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

            if (!string.IsNullOrEmpty(password))
            {
                result = await UpdatePassword(user, password);

                if (result.Any()) return result;
            }

            if (!string.IsNullOrEmpty(role))
            {
                List<string> roles = ((List<string>)await _userManager.GetRolesAsync(user));
                result = await UpdateRole(user, roles, role);

                if (result.Any()) return result;

            }

            return new List<IdentityError>();
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

        private async Task<IEnumerable<IdentityError>> UpdatePassword(AppUser user, string password)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, password);

            return result.Errors;
        }

        private async Task<IEnumerable<IdentityError>> UpdateRole(AppUser user, List<string> roles, string role)
        {
            string foundedRole = roles.SingleOrDefault(r => r == role);

            if (string.IsNullOrEmpty(foundedRole))
            {
                await _userManager.RemoveFromRoleAsync(user, roles[0]);
                var result = await _userManager.AddToRoleAsync(user, role);

                return result.Errors;
            }

            // Empty error list
            return new List<IdentityError>();
        }

    }
}
