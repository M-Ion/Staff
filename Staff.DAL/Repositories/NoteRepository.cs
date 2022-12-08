using Microsoft.EntityFrameworkCore;
using Staff.DAL.Contracts;
using Staff.Domain;

namespace Staff.DAL.Repositories
{
    public class NoteRepository : GenericRepository<Note>, INoteRepository
    {
        readonly StaffDbContext _context;

        public NoteRepository(StaffDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IList<Note>> GetEvery(string companyId, string userId)
        {
            IQueryable<Note> query = _context.Set<Note>().Where(
                n => n.User.Id == userId && 
                n.Company.Id.ToString() == companyId &&
                n.IsCompleted == false
                );
            IList<Note> entities = await query.ToListAsync();

            return entities;
        }
    }
}
