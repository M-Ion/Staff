using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Dish
{
    public class UpdateDishDto
    {
        [MinLength(2)]
        public string Name { get; set; }

        public string Category { get; set; }

        public float Price { get; set; }

        public bool? IsInStop { get; set; }
    }
}
