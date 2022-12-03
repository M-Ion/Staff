using Staff.Common.Dtos.Dish;
using Staff.Domain.Dishes;

namespace Staff.Common.Dtos.Order
{
    public class GetOrderDto
    {
        public virtual GetDishDto Dish { get; set; }

        public int Quantity { get; set; } = 1;

        public bool IsPrepared { get; set; }
    }
}
