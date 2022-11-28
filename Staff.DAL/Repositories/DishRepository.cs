using Staff.DAL.Contracts;
using Staff.Domain.Dishes;

namespace Staff.DAL.Repositories
{
    public class DishRepository : GenericRepository<Dish>, IDishRepository
    {
        public DishRepository(StaffDbContext context) : base(context)
        {
        }
    }
}
