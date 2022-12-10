using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Dish;
using Staff.Domain.Dishes;

namespace Staff.Common.Dtos.Order
{
    public class GetOrderDto : BaseDto
    {
        public virtual DishDto Dish { get; set; }

        public int Quantity { get; set; } = 1;

        public bool IsPrepared { get; set; }

        public UserNameDto User { get; set; }

        public DateTime Created { get; set; }
    }
}
