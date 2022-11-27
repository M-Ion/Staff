﻿using System.ComponentModel.DataAnnotations;
using Staff.Domain.Dishes;

namespace Staff.Domain
{
    public class Order : BaseEntity
    {
        public virtual Note Note { get; set; }

        public virtual Dish Dish { get; set; }

        public sbyte Quantity { get; set; } = 1;

        public bool IsPrepared { get; set; } = false;
    }
}
