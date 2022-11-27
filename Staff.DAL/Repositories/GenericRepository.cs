using Microsoft.EntityFrameworkCore;
using Staff.DAL.Contracts;
using Staff.Domain;

namespace Staff.DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StaffDbContext _context;

        public GenericRepository(StaffDbContext context)
        {
            _context = context;
        }

        public async Task Add(T entity)
        {
            await _context.AddAsync(entity);

            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid id, string companyId)
        {
            T entity = await Get(id, companyId);
            bool exists = entity != null;

            return exists;
        }

        public async Task<T> Get(Guid id, string companyId)
        {
            T entity = await _context.Set<T>().FirstOrDefaultAsync(
                e => e.Id == id &&
                e.Company.Id.ToString() == companyId
                );

            return entity;
        }

        public async Task<IList<T>> GetEvery(string companyId)
        {
            IQueryable<T> query = _context.Set<T>().Where(e => e.Company.Id.ToString() == companyId);
            IList<T> entities = await query.ToListAsync();

            return entities;
        }

        public async Task Remove(Guid id, string companyId)
        {
            T entity = await Get(id, companyId);
            _context.Set<T>().Remove(entity);

            await _context.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            _context.Update(entity);

            await _context.SaveChangesAsync();
        }
    }
}
