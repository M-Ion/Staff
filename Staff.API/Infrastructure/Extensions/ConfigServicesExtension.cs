using Microsoft.AspNetCore.Authorization;
using Staff.API.Infrastructure.Filters;
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

            services.AddScoped<SafeFilter>();

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddScoped(typeof(IGenericService<,,,,>), typeof(GenericService<,,,,>));

            services.AddScoped<ICompanyRepository, CompanyRepository>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();

            services.AddScoped<INoteRepository, NoteRepository>();

            services.AddScoped<IDishRepository, DishRepository>();

            services.AddScoped<IOrderRepository, OrderRepository>();

            services.AddScoped<ITokenManager, TokenManager>();

            services.AddScoped<IAuthManager, AuthManager>();

            services.AddScoped<IBlobManager, BlobManager>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IBlobService, BlobService>();

            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<INoteService, NoteService>();

            services.AddScoped<IDishService, DishService>();

            services.AddScoped<IOrderService, OrderService>();

            return services;
        }
    }
}
