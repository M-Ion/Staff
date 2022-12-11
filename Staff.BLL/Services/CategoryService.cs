using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.Category;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using Staff.Domain.Dishes;

namespace Staff.BLL.Services
{
    public class CategoryService : GenericService<Category, CategoryDto, CategoryDto, CreateCategoryDto, UpdateCategoryDto>, ICategoryService
    {
        public CategoryService(
            IMapper mapper, 
            IGenericRepository<Category> repo, 
            IHttpContextCurrentUser user,
            IOrderRepository orderRepo
            ) : base(mapper, repo, user, orderRepo)
        {
        }

        public async Task<IList<Group>> GetCategoriesStats()
        {
            return await GetStats("dish.Category");
        }

        public async Task<IList<Group>> GetStatsByCategory(string id, GroupStatsBy by = GroupStatsBy.Year)
        {
            return await GetSpecificStats(id, "dish.Category.Id", by);
        }
    }
}
