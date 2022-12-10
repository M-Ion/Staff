using Microsoft.EntityFrameworkCore;
using Staff.DAL.Contracts;
using Staff.Domain;
using Staff.Domain.Dishes;

namespace Staff.DAL.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        readonly StaffDbContext _context;

        public OrderRepository(StaffDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
