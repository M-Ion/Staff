using Staff.Domain.Dishes;
using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Category
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DishTypes DishType { get; set; }
    }
}
