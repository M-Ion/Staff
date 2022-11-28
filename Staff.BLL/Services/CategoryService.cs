using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.Category;
using Staff.DAL.Contracts;
using Staff.Domain.Dishes;

namespace Staff.BLL.Services
{
    public class CategoryService : GenericService<Category, CategoryDto, CategoryDto, CreateCategoryDto, UpdateCategoryDto>, ICategoryService
    {
        public CategoryService(IMapper mapper, IGenericRepository<Category> repo, IHttpContextCurrentUser user) : base(mapper, repo, user)
        {
        }
    }
}
