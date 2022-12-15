using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Dish;
using Staff.Common.Exceptions;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using Staff.Domain.Dishes;

namespace Staff.BLL.Services
{
    public class DishService : GenericService<Dish, DishDto, DishDto, CreateDishDto, UpdateDishDto>, IDishService
    {
        readonly IDishRepository _dishRepo;
        readonly ICategoryRepository _categoryRepo;

        public DishService(
            IMapper mapper,
            IGenericRepository<Dish> repo,
            IHttpContextCurrentUser user,
            IDishRepository dishRepo,
            IOrderRepository orderRepo,
            ICategoryRepository categoryRepo
            ) : base(mapper, repo, user, orderRepo)
        {
            _dishRepo = dishRepo;
            _categoryRepo = categoryRepo;
        }

        public override async Task<BaseDto> Add(CreateDishDto createDto)
        {
            Category category = await ExistsCategory(createDto.Category);

            if (category is not null)
            {
                var entity = _mapper.Map<Dish>(createDto);
                entity.Category = category;

                Guid id = (await _dishRepo.Add(entity, _user.CompanyId)).Id;

                return new BaseDto() { Id = id };
            }
            else
            {
                throw new NotFoundException($"Category with id {createDto.Category} not found.");
            }
        }

        public async Task<IList<DishDto>> GetByCategory(string categoryId)
        {
            Filter filter = new() { Prop = "category.Id", Operation = Op.Eq, Value = categoryId };
            FilteredRequest filteredRequest = new() { Filters = new List<Filter>() { filter } };

            FilteredResult<DishDto> result = await _dishRepo.GetAllAsyncProcessed<DishDto>(_user.CompanyId, filteredRequest, _mapper);
            return result.Items;
        }

        public override async Task Update(string id, UpdateDishDto updateDto)
        {
            if (updateDto.Category is null)
            {
                await base.Update(id, updateDto);
                return;
            }

            if (await _dishRepo.Exists(new Guid(id), _user.CompanyId))
            {
                var entity = await _dishRepo.Get(new Guid(id), _user.CompanyId);
                _mapper.Map(updateDto, entity);

                Category category = await ExistsCategory(updateDto.Category);

                if (category is not null)
                {
                    entity.Category = category;

                    await _dishRepo.Update(entity);
                }
                else
                {
                    throw new NotFoundException($"Category with id {updateDto.Category} not found.");
                }
            }
            else
            {
                throw new NotFoundException($"Dish with id {id} not found.");
            }
        }

        public async Task UpdateBlob(string id, string uri)
        {
            Guid identity = new Guid(id);

            if (await _dishRepo.Exists(identity, _user.CompanyId))
            {
                Dish entity = await _dishRepo.Get(identity, _user.CompanyId);
                entity.Blob = uri;

                await _dishRepo.Update(entity);
            }
        }

        public async Task<IList<Group>> GetDishesStats()
        {
            return await GetStats("dish");
        }

        public async Task<IList<Group>> GetStatsByDish(string id, GroupStatsBy by = GroupStatsBy.Year)
        {
            return await GetSpecificStats(id, "dish.Id", by);
        }

        private async Task<Category> ExistsCategory(string id)
        {
            Guid identity = new Guid(id);

            if (!(await _categoryRepo.Exists(new Guid(id), _user.CompanyId)))
            {
                return null;
            }

            var entity = await _categoryRepo.Get(identity, _user.CompanyId);
            return entity;
        }
    }
}
