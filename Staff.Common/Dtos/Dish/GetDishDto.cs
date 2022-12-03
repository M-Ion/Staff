using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.Common.Dtos.Dish
{
    public class GetDishDto : BaseDto
    {
        public string Name { get; set; }

        public float Price { get; set; }

        public bool IsInStop { get; set; }
    }
}
