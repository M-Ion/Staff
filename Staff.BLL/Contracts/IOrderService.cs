using Staff.Common.Dtos.Order;
using Staff.Domain;

namespace Staff.BLL.Contracts
{
    public interface IOrderService : IGenericService<Order, GetOrderDto, GetOrderDto, CreateOrderDto, UpdateOrderDto>
    {
    }
}
