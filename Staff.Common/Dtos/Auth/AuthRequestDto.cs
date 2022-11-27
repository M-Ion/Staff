
namespace Staff.Common.Dtos.Auth
{
    public class AuthRequestDto
    {
        public string Jwt { get; set; }

        public string RefreshToken { get; set; }
    }
}
