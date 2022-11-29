using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Staff.Common.Dtos.Dish
{
    public class CreateDishDto
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public float Price { get; set; }
    }
}
