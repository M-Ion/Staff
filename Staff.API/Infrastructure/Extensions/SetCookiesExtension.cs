using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Staff.Common.Dtos;

namespace Staff.API.Infrastructure.Extensions
{
    public static class SetCookiesExtension
    {
        public static ActionResult SetCookie(
            this ActionResult actionResult,
            HttpResponse httpResponse,
            SetCookieDto cookieDto
            )
        {
            CookieOptions options = new()
            {
                Expires = cookieDto.Expires,
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.None,
            };

            httpResponse.Cookies.Append(cookieDto.Name, cookieDto.Value, options);

            return actionResult;
        }

        public static ActionResult ClearCookie(
            this ActionResult actionResult,
            HttpResponse httpResponse,
            string cookie
            )
        {
            httpResponse.Cookies.Delete(cookie, new CookieOptions()
            {
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.None,
            });

            return actionResult;
        }
    }
}
