using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.AppUser;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet("Workers")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<IList<GetAppUserDto>>> Get()
        {
            return Ok(await _companyService.GetWorkers());
        }
    }
}
