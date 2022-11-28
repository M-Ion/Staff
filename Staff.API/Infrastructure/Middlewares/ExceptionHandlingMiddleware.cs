using Staff.Common.Models;
using System.Net;

namespace Staff.API.Infrastructure.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";

            var errDetails = new ErrorDetails()
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Status = "Failure",
                Message = ex.Message
            };

            switch (ex)
            {
                default:
                    break;
            }

            context.Response.StatusCode = errDetails.StatusCode;

            return context.Response.WriteAsync(errDetails.ToString());
        }
    }
}
