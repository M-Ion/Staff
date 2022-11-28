using Staff.Common.Dtos.Category;
using Staff.Domain.Dishes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.BLL.Contracts
{
    public interface ICategoryService : IGenericService<Category, CategoryDto, CategoryDto, CreateCategoryDto, CreateCategoryDto>
    {
    }
}
