using Staff.Domain.Dishes;
using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Category
{
    public class UpdateCategoryDto
    {
        public string Name { get; set; }

        public DishTypes DishType { get; set; }
    }
}
