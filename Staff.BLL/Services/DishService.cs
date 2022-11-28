using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Dish;
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
            ICategoryRepository categoryRepo
            ) : base(mapper, repo, user)
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
                throw new Exception();
            }
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
                    throw new Exception();
                }
            }
            else
            {
                throw new Exception();
            }
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
