using Staff.Common.Constants;
using Staff.Common.Exceptions;
using Staff.Common.Models;
using System.ComponentModel.DataAnnotations;
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
                case FormatException:
                    errDetails.StatusCode = (int)HttpStatusCode.NotFound;
                    errDetails.Status = ExceptionStatus.NotFound;
#if RELEASE
                    errDetails.Message = "Entity with provided id not found.";
#endif
                    break;
                case NotSafeException:
                    errDetails.StatusCode = (int)HttpStatusCode.Forbidden;
                    errDetails.Status = ExceptionStatus.AccessNotAllowed;
#if RELEASE
                    errDetails.Message = "Entity with provided id not found.";
#endif
                    break;
                case NotFoundException:
                    errDetails.StatusCode = (int)HttpStatusCode.NotFound;
                    errDetails.Status = ExceptionStatus.NotFound;
                    break;
                case ValidationException:
                    errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                    errDetails.Status = ExceptionStatus.Invalid;
                    break;
                case InvalidTokenException:
                    errDetails.StatusCode = (int)HttpStatusCode.Unauthorized;
                    errDetails.Status = ExceptionStatus.InvalidToken;
#if RELEASE
                    errDetails.Message = "You are unauthorized.";
#endif
                    break;
                case InvalidFileExtensionException:
                    errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                    errDetails.Status = ExceptionStatus.InvalidFileExtension;
                    break;
                case InvalidFilteringException:
                    errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                    errDetails.Status = ExceptionStatus.InvalidFiltering;
#if RELEASE
                    errDetails.Message = "Error on filtering data.";
#endif
                    break;
                case InvalidGroupingException:
                    errDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                    errDetails.Status = ExceptionStatus.InvalidGrouping;
#if RELEASE
                    errDetails.Message = "Error on grouping data.";
#endif
                    break;
                default:
                    break;
            }

            context.Response.StatusCode = errDetails.StatusCode;

            return context.Response.WriteAsync(errDetails.ToString());
        }
    }
}
