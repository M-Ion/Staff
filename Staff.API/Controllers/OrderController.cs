using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.API.Infrastructure.Filters;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Order;
using Staff.Common.Filtering;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IList<GetOrderDto>>> Get()
        {
            return Ok(await _orderService.GetEvery());
        }

        [HttpPost]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult<BaseDto>> Post([FromBody] CreateOrderDto dto)
        {
            BaseDto baseDto = await _orderService.Add(dto);
            return Ok(baseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult> Put(string id, [FromBody] UpdateOrderDto dto)
        {
            await _orderService.Update(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        //[ServiceFilter(typeof(SafeFilter))]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult> Delete(string id)
        {
            await _orderService.Delete(id);
            return NoContent();
        }

        [HttpGet("Cook")]
        [Authorize]
        public async Task<ActionResult<FilteredResult<GetOrderDto>>> GetCookOrders([FromBody] IList<Filter> filters)
        {
            var result = await _orderService.Get(filters);
            return Ok(result);
        }
    }
}
