using AutoMapper;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Auth;
using Staff.Common.Dtos.Company;
using Staff.Common.Dtos.Note;
using Staff.Common.Dtos.Orders;
using Staff.Domain;
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

            CreateMap<Note, GetNoteDto>().ReverseMap();

            CreateMap<Order, GetOrderDto>().ReverseMap();
        }
    }
}
