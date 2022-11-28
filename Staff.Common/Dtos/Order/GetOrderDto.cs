using Staff.Domain.Dishes;

namespace Staff.Common.Dtos.Orders
{
    public class GetOrderDto : BaseDto
    {
        public virtual Staff.Domain.Dishes.Dish Dish { get; set; }

        public sbyte Quantity { get; set; }

        public bool IsPrepared { get; set; }
    }
}
