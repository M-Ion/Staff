using Staff.Domain.Dishes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.DAL.Contracts
{
    public interface IDishRepository : IGenericRepository<Dish>
    {
    }
}
