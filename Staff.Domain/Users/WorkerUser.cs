namespace Staff.Domain.Users
{
    public class WorkerUser : AppUser
    {
        public virtual IList<Note> Notes { get; set; }
    }
}
