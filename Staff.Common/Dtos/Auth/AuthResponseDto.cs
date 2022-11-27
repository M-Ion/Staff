using Staff.Common.Dtos.AppUser;

namespace Staff.Common.Dtos.Auth
{
    public class AuthResponseDto
    {
        public GetAppUserDto User { get; set; }

        public string Jwt { get; set; }

        public string RefreshToken { get; set; }

    }
}
