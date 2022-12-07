using Microsoft.EntityFrameworkCore;
using Staff.DAL.Contracts;
using Staff.Domain.Dishes;

namespace Staff.DAL.Repositories
{
    public class DishRepository : GenericRepository<Dish>, IDishRepository
    {
        readonly StaffDbContext _context;

        public DishRepository(StaffDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IList<Dish>> GetByCategory(string categoryId, string companyId)
        {
            return await _context.Set<Dish>().Where(
                d => d.Category.Id.ToString() == categoryId &&
                d.Company.Id.ToString() == companyId
                ).ToListAsync();
        }
    }
}
