using Microsoft.EntityFrameworkCore;
using Staff.Domain.Users;
using System.ComponentModel.DataAnnotations;

namespace Staff.Domain
{
    public class Company
    {
        [Key]
        public Guid Id { get; set; }

        public string Safe { get; set; }

        private IList<AppUser> _users;

        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [BackingField(nameof(_users))]
        public virtual IList<AppUser> Users
        {
            get { return _users; }
            private set { _users = value; }
        }
    }
}
