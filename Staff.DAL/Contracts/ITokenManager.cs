using Staff.Common.Dtos.Auth;
using Staff.Domain;
using Staff.Domain.Users;

namespace Staff.DAL.Contracts
{
    public interface ITokenManager
    {
        Task<AuthResponseDto> GenerateTokens(AppUser user);

        Task<AuthResponseDto> RefreshJwt(AuthRequestDto authRequestDto);

        Task RevokeRefreshToken(RefreshToken refreshToken);

        Task<RefreshToken> ExistsRefreshToken(string token);
    }
}
