using Staff.API.Infrastructure.Middlewares;

namespace Staff.API.Infrastructure.Extensions
{
    public static class MiddlewaresExtension
    {
        public static IApplicationBuilder UseDbTransaction(this IApplicationBuilder app)
        {
            app.UseMiddleware<DbTransactionMiddleware>();
            return app;
        }

        public static IApplicationBuilder UseGlobalErrorHandling(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            return app;
        }
    }
}
