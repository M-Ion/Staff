using AutoMapper;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Auth;
using Staff.Common.Dtos.Category;
using Staff.Common.Dtos.Company;
using Staff.Common.Dtos.Dish;
using Staff.Common.Dtos.Note;
using Staff.Common.Dtos.Order;
using Staff.Domain;
using Staff.Domain.Dishes;
using Staff.Domain.Users;

namespace Staff.Common.Configs
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<AppUser, RegisterManagerDto>().ReverseMap();
            CreateMap<AppUser, GetAppUserDto>().ReverseMap();

            CreateMap<WorkerUser, RegisterStaffDto>().ReverseMap();
            CreateMap<WorkerUser, GetAppUserDto>().ReverseMap();
            CreateMap<WorkerUser, GetWorkerUserDto>().ReverseMap();

            CreateMap<Company, GetCompanyDto>().ReverseMap();

            CreateMap<Note, CreateNoteDto>().ReverseMap();
            CreateMap<Note, GetNoteDto>().ReverseMap();
            CreateMap<Note, UpdateNoteDto>().ReverseMap();

            CreateMap<Order, GetOrderDto>().ReverseMap();
            CreateMap<Order, CreateOrderDto>()
                .ReverseMap()
                .ForMember(o => o.Note, options => options.Ignore())
                .ForMember(o => o.Dish, options => options.Ignore());
            CreateMap<Order, UpdateOrderDto>()
                .ReverseMap()
                .ForAllMembers(opt => opt.Condition(IgnoreNullAndDefault)); ;

            CreateMap<Category, CreateCategoryDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, UpdateCategoryDto>().ReverseMap().ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Dish, CreateDishDto>().ReverseMap().ForMember(d => d.Category, options => options.Ignore());
            CreateMap<Dish, GetDishDto>().ReverseMap();
            CreateMap<Dish, DishDto>().ReverseMap();
            CreateMap<Dish, UpdateDishDto>().ReverseMap()
                .ForMember(d => d.Category, options => options.Ignore())
                .ForAllMembers(opt => opt.Condition(IgnoreNullAndDefault));
        }

        private bool IgnoreNullAndDefault<TSrc, TDest>(TSrc src, TDest des, object srcMember, object destMember)
        {
            object srcDefaultValue = null;

            if (srcMember != null)
            {
                Type srcType = srcMember.GetType();

                if (srcType.IsValueType && srcType != typeof(bool))
                {
                    srcDefaultValue = Activator.CreateInstance(srcType);
                }
            }

            bool srcHasNoValue = Object.Equals(srcMember, srcDefaultValue);

            return !srcHasNoValue;
        }
    }
}
