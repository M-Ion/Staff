using Microsoft.EntityFrameworkCore;
using Staff.DAL.Contracts;
using Staff.Domain;

namespace Staff.DAL.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly StaffDbContext _context;

        public CompanyRepository(StaffDbContext context)
        {
            _context = context;
        }

        public async Task Add(Company entity)
        {
            await _context.Set<Company>().AddAsync(entity);

            await _context.SaveChangesAsync();
        }

        public async Task<Company> Get(string id)
        {
            Company entity = await _context.Set<Company>().FirstOrDefaultAsync(e => e.Id.ToString() == id);

            return entity;
        }
    }
}
