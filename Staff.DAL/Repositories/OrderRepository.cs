using Staff.DAL.Contracts;
using Staff.Domain;

namespace Staff.DAL.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(StaffDbContext context) : base(context)
        {
        }
    }
}
