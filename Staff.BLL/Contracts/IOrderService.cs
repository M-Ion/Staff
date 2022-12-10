using Staff.Common.Dtos.Order;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.Domain;
using Staff.Domain.Dishes;

namespace Staff.BLL.Contracts
{
    public interface IOrderService : IGenericService<Order, GetOrderDto, GetOrderDto, CreateOrderDto, UpdateOrderDto>
    {
        Task<IList<GetOrderDto>> GetOrdersByDishType(DishTypes type);
    }
}
