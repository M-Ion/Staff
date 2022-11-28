using Staff.Domain.Dishes;
using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Category
{
    public class CategoryDto
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DishTypes DishType { get; set; }
    }
}
