using Staff.Common.Dtos.Category;

namespace Staff.Common.Dtos.Dish
{
    public class DishDto : BaseDto
    {
        public string Name { get; set; }

        public float Price { get; set; }

        public CategoryDto Category { get; set; }

        public bool IsInStop { get; set; }

        public string Blob { get; set; }
    }
}
