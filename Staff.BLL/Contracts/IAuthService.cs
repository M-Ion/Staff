using Microsoft.AspNetCore.Identity;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Auth;

namespace Staff.BLL.Contracts
{
    public interface IAuthService
    {
        Task<IEnumerable<IdentityError>> Register(RegisterManagerDto registerDto);

        Task<IEnumerable<IdentityError>> Register(RegisterStaffDto registerDto);

        Task<AuthResponseDto> Login(LoginDto loginUserDto);

        Task<TokenDto> AccessToken();

        Task<AuthResponseDto> CheckUserSession();

        Task<AuthResponseDto> Refresh();

        Task Logout();
    }
}
