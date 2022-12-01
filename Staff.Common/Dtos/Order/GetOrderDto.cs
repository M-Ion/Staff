using Staff.Common.Dtos.Dish;
using Staff.Domain.Dishes;

namespace Staff.Common.Dtos.Order
{
    public class GetOrderDto : BaseDto
    {
        public virtual DishDto Dish { get; set; }

        public bool IsPrepared { get; set; }
    }
}
