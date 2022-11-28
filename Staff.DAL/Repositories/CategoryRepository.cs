using Staff.DAL.Contracts;
using Staff.Domain.Dishes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.DAL.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(StaffDbContext context) : base(context)
        {
        }
    }
}
