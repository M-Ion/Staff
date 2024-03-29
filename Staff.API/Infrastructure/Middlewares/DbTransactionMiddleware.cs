﻿using Staff.DAL;

namespace Staff.API.Infrastructure.Middlewares
{
    public class DbTransactionMiddleware
    {
        private readonly RequestDelegate _next;

        public DbTransactionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext, StaffDbContext dbContext)
        {
            if (httpContext.Request.Method == HttpMethod.Get.Method)
            {
                await _next(httpContext);
                return;
            }

            using (var transaction = dbContext.Database.BeginTransactionAsync())
            {
                await _next(httpContext);

                await dbContext.Database.CommitTransactionAsync();
            }
        }
    }
}
