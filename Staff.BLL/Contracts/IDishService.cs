using Staff.Common.Dtos.Dish;
using Staff.Domain.Dishes;

namespace Staff.BLL.Contracts
{
    public interface IDishService : IGenericService<Dish, DishDto, DishDto, CreateDishDto, UpdateDishDto>
    {
    }
}
