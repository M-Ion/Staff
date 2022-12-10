using Microsoft.EntityFrameworkCore;
using Staff.DAL.Contracts;
using Staff.Domain;
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
    }
}
