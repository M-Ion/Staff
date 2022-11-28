using Microsoft.AspNetCore.Authorization;
using Staff.BLL.Contracts;
using Staff.BLL.Services;
using Staff.DAL.Contracts;
using Staff.DAL.Repositories;
using Staff.DAL.Repositories.Auth;
using System.IdentityModel.Tokens.Jwt;

namespace Staff.API.Infrastructure.Extensions
{
    public static class ConfigServicesExtension
    {
        public static IServiceCollection ConfigServices(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddSingleton(new JwtSecurityTokenHandler());

            services.AddScoped<IAuthorizationMiddlewareResultHandler, AuthRefreshHandler>();

            services.AddScoped<IHttpContextCurrentUser, HttpContextCurrentUser>();

            services.AddScoped<IHttpContextCookies, HttpContextCookies>();

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddScoped(typeof(IGenericService<,,,,>), typeof(GenericService<,,,,>));

            services.AddScoped<ICompanyRepository, CompanyRepository>();

            services.AddScoped<ITokenManager, TokenManager>();

            services.AddScoped<IAuthManager, AuthManager>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<ICategoryService, CategoryService>();

            return services;
        }
    }
}
