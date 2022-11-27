using System.ComponentModel.DataAnnotations;


namespace Staff.Domain
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public virtual Company Company { get; set; }
    }
}
