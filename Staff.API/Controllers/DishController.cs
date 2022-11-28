using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Dish;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        readonly IDishService _dishService;

        public DishController(IDishService dishService)
        {
            _dishService = dishService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IList<DishDto>>> Get()
        {
            return Ok(await _dishService.GetEvery());
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<BaseDto>> Post([FromBody] CreateDishDto dto)
        {
            BaseDto baseDto = await _dishService.Add(dto);
            return Ok(baseDto);
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
