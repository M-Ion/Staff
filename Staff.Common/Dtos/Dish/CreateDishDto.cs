using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
