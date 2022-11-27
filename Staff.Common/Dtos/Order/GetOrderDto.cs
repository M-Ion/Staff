using Staff.Domain.Dishes;

namespace Staff.Common.Dtos.Orders
{
    public class GetOrderDto : BaseDto
    {
        public virtual Dish Dish { get; set; }

        public sbyte Quantity { get; set; }

        public bool IsPrepared { get; set; }
    }
}
