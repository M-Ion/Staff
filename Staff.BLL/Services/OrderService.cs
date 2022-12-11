using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Category;
using Staff.Common.Dtos.Dish;
using Staff.Common.Dtos.Order;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using Staff.Domain;
using Staff.Domain.Dishes;

namespace Staff.BLL.Services
{
    public class OrderService : GenericService<Order, GetOrderDto, GetOrderDto, CreateOrderDto, UpdateOrderDto>, IOrderService
    {
        readonly IOrderRepository _orderRepo;
        readonly INoteRepository _noteRepo;
        readonly IDishRepository _dishRepo;

        public OrderService(
            IMapper mapper,
            IGenericRepository<Order> repo,
            IHttpContextCurrentUser user,
            IOrderRepository orderRepo,
            INoteRepository noteRepo,
            IDishRepository dishRepo
            ) : base(mapper, repo, user, orderRepo)
        {
            _orderRepo = orderRepo;
            _noteRepo = noteRepo;
            _dishRepo = dishRepo;
        }

        public override async Task<BaseDto> Add(CreateOrderDto createDto)
        {
            Order entity = _mapper.Map<Order>(createDto);
            bool existsNote = await _noteRepo.Exists(new Guid(createDto.Note), _user.CompanyId);

            if (existsNote)
            {
                bool existsDish = await _dishRepo.Exists(new Guid(createDto.Dish), _user.CompanyId);

                if (existsDish)
                {
                    Note note = await _noteRepo.Get(new Guid(createDto.Note), _user.CompanyId);
                    Dish dish = await _dishRepo.Get(new Guid(createDto.Dish), _user.CompanyId);

                    entity.Note = note;
                    entity.Dish = dish;

                    Order order = await _orderRepo.Add(entity, _user.CompanyId);

                    return new BaseDto { Id = order.Id };
                }
            }

            throw new Exception();
        }

        public async Task<IList<GetOrderDto>> GetOrdersByDishType(DishTypes type)
        {
            Filter filter = new() { Prop = "dish.Category.DishType", Operation = Op.Eq, Value = type };
            Filter prepared = new() { Prop = "isPrepared", Operation = Op.Eq, Value = false };

            FilteredRequest filteredRequest = new() { Filters = new List<Filter>() { filter, prepared } };

            IList<GetOrderDto> entities = (await _orderRepo.GetAllAsyncProcessed<GetOrderDto>(_user.CompanyId, filteredRequest, _mapper)).Items;

            return entities;
        }

    }
}
