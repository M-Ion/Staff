using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.Extensions.Primitives;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Staff.API.Infrastructure
{
    public class AuthRefreshHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly IAuthorizationService _authorizationService;

        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextCookies _contextCookies;

        public AuthRefreshHandler(
            IAuthorizationService authorizationService,
            JwtSecurityTokenHandler jwtSecurityTokenHandler,
            IAuthService authService,
            IConfiguration configuration,
            IHttpContextCookies contextCookies
            )
        {
            _authorizationService = authorizationService;
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _authService = authService;
            _configuration = configuration;
            _contextCookies = contextCookies;
        }

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            bool existsRefreshToken = _contextCookies.RefreshToken is not null;

            if (authorizeResult.Challenged && existsRefreshToken)
            {
                AuthResponseDto authResponse = await _authService.Refresh();

                context.User = GenerateHttpContextUser(authResponse.Jwt);

                SetJwtCookie(context.Response, authResponse);

                authorizeResult = PolicyAuthorizationResult.Success();

                var authResult = await _authorizationService.AuthorizeAsync(context.User, policy);

                if (!authResult.Succeeded)
                    authorizeResult = PolicyAuthorizationResult.Forbid();
            }

            await defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }

        private ClaimsPrincipal GenerateHttpContextUser(string token)
        {
            JwtSecurityToken jwt = _jwtSecurityTokenHandler.ReadJwtToken(token);
            ClaimsIdentity identity = new ClaimsIdentity(jwt.Claims, "Refresh");

            return new ClaimsPrincipal(identity);
        }

        private void SetJwtCookie(HttpResponse httpResponse, AuthResponseDto authResponse)
        {
            CookieOptions options = new()
            {
                Expires = DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:DurationInMonths"])),
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.None,
            };

            httpResponse.Cookies.Append("jwt", authResponse.Jwt, options);
        }
    }
}
