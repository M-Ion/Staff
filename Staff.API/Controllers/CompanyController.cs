using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Grouping;

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

        [HttpGet("Workers/Statistics/{id}")]
        [Authorize]
        public async Task<ActionResult<IList<Group>>> GetSpecificStatistics(string id, [FromQuery] GroupStatsBy by)
        {
            return Ok(await _companyService.GetStatsByWorker(id, by));
        }

        [HttpGet("Workers/Statistics")]
        [Authorize]
        public async Task<ActionResult<IList<Group>>> GetStatistics()
        {
            return Ok(await _companyService.GetWorkersStats());
        }
    }
}
