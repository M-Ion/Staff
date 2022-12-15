using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Staff.BLL.Contracts;
using Staff.Common.Exceptions;
using Staff.DAL;
using Staff.Domain;
using System.Text;
using System.Text.Json;

namespace Staff.API.Infrastructure.Filters
{
    public class SafeFilter : IAsyncAuthorizationFilter
    {
        readonly StaffDbContext _dbContext;
        readonly IHttpContextCurrentUser _currentUser;

        public SafeFilter(StaffDbContext dbContext, IHttpContextCurrentUser currentUser)
        {
            _dbContext = dbContext;
            _currentUser = currentUser;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            context.HttpContext.Request.EnableBuffering();

            using (StreamReader reader
                      = new(context.HttpContext.Request.Body, Encoding.UTF8, true, 1024, true))
            {
                try
                {
                    string body = await reader.ReadToEndAsync();
                    JToken safe = JObject.Parse(body)["safe"];

                    if (safe == null)
                    {
                        context.Result = new ForbidResult();
                        return;
                    }

                    Company company = _dbContext.Set<Company>().FirstOrDefault(c => c.Id.ToString() == _currentUser.CompanyId);

                    if (company.Safe != safe.ToString())
                    {
                        context.Result = new ForbidResult();
                        return;
                    }
                }
                catch
                {
                    throw new NotSafeException("Safe passcode is incorrect or was not provided.");
                }
            }
        }
    }
}
