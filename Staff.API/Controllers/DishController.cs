using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Dish;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.DAL;
using Staff.DAL.Contracts;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        readonly IDishService _dishService;
        readonly IDishRepository _repo;

        public DishController(IDishService dishService, IDishRepository repo)
        {
            _dishService = dishService;
            _repo = repo;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IList<DishDto>>> Get()
        {
            return Ok(await _dishService.GetEvery());
        }

        [HttpGet("Category")]
        [Authorize]
        public async Task<ActionResult<FilteredResult<DishDto>>> GetFiltered([FromQuery] string category)
        {
            return Ok(await _dishService.GetByCategory(category));
        }

        [HttpGet("Statistics/{id}")]
        [Authorize]
        public async Task<ActionResult<IList<Group>>> GetDishStatistics(string id, [FromQuery] GroupStatsBy by)
        {
            return Ok(await _dishService.GetStatsByDish(id, by));
        }

        [HttpGet("Statistics")]
        [Authorize]
        public async Task<ActionResult<IList<Group>>> GetStatistics()
        {
            return Ok(await _dishService.GetDishesStats());
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<BaseDto>> Post([FromBody] CreateDishDto dto)
        {
            BaseDto baseDto = await _dishService.Add(dto);
            return Ok(baseDto);
        }

        [HttpPost("Filtered")]
        [Authorize]
        public async Task<ActionResult<IList<DishDto>>> GetFiltered([FromBody] IList<Filter> filters)
        {
            return Ok(await _dishService.Get(filters));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(string id, [FromBody] UpdateDishDto dto)
        {
            await _dishService.Update(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Delete(string id)
        {
            await _dishService.Delete(id);
            return NoContent();
        }
    }
}
