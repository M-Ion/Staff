using System.ComponentModel.DataAnnotations;

namespace Staff.Domain.Dishes
{
    public class Category : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DishTypes DishType { get; set; }
    }
}
