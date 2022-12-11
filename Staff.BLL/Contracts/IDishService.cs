using Staff.Common.Dtos.Dish;
using Staff.Common.Grouping;
using Staff.Domain.Dishes;

namespace Staff.BLL.Contracts
{
    public interface IDishService : IGenericService<Dish, DishDto, DishDto, CreateDishDto, UpdateDishDto>
    {
        Task UpdateBlob(string id, string uri);

        Task<IList<DishDto>> GetByCategory(string categoryId);

        Task<IList<Group>> GetDishesStats();

        Task<IList<Group>> GetStatsByDish(string id, GroupStatsBy by = GroupStatsBy.Year);
    }
}
