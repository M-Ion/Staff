using Microsoft.AspNetCore.Http;
using Staff.BLL.Contracts;

namespace Staff.BLL.Services
{
    public class HttpContextCookies : IHttpContextCookies
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextCookies(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string Jwt
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Cookies["jwt"];
            }
        }

        public string RefreshToken
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Cookies["refreshToken"];
            }
        }
    }
}
