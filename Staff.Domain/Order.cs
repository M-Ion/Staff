using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Staff.Domain.Dishes;
using Staff.Domain.Users;

namespace Staff.Domain
{
    public class Order : BaseEntity
    {
        private WorkerUser _user;

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public virtual Note Note { get; set; }

        public virtual Dish Dish { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public bool IsPrepared { get; set; } = false;

        [BackingField(nameof(_user))]
        public virtual WorkerUser User
        {
            get { return _user; }
            private set { _user = value; }
        }
    }
}
