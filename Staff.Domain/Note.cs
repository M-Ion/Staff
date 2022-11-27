using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Staff.Domain.Users;

namespace Staff.Domain
{
    public class Note : BaseEntity
    {
        private WorkerUser _user;

        public virtual IList<Order> Orders { get; set; }

        [BackingField(nameof(_user))]
        public virtual WorkerUser User
        {
            get { return _user; }
            private set { _user = value; }
        }

        public bool IsCompleted { get; set; } = false;
    }
}
