using Microsoft.AspNetCore.Identity;
using Staff.Common.Dtos.Auth;
using Staff.Domain.Users;

namespace Staff.DAL.Contracts
{
    public interface IAuthManager
    {
        Task<IEnumerable<IdentityError>> Register(AppUser user, string password);

        Task<IEnumerable<IdentityError>> Register(WorkerUser user, string password, string role);

        Task<AppUser> Login(LoginDto loginUserDto);

        Task<IEnumerable<IdentityError>> Update(AppUser workerUser, string role = null, string updatedPassword = null);
    }
}
