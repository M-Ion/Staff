using System.ComponentModel.DataAnnotations;

namespace Staff.Domain.Dishes
{
    public class Dish : BaseEntity
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        public virtual Category Category { get; set; }

        [Required]
        public float Price { get; set; }

        public string Blob { get; set; }

        public bool IsInStop { get; set; } = false;
    }
}

