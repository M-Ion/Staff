using Microsoft.AspNetCore.Http;
using Staff.BLL.Contracts;

namespace Staff.BLL.Services
{
    public class HttpContextCurrentUser : IHttpContextCurrentUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextCurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string CompanyId
        {
            get
            {
                var httpContext = _httpContextAccessor.HttpContext;
                return httpContext.User.Claims.FirstOrDefault(c => c.Type == "company")?.Value;
            }
        }

        public string Id
        {
            get
            {
                var httpContext = _httpContextAccessor.HttpContext;
                return httpContext.User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            }
        }
    }
}
