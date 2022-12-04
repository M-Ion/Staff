using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.AppUser;
using Staff.Domain.Users;

namespace Staff.BLL.Services
{
    public class CompanyService : ICompanyService
    {
        readonly IHttpContextCurrentUser _currentUser;
        readonly UserManager<AppUser> _userManager;
        readonly IMapper _mapper;

        public CompanyService(IHttpContextCurrentUser currentUser, UserManager<AppUser> userManager, IMapper mapper)
        {
            _currentUser = currentUser;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<IList<GetAppUserDto>> GetWorkers()
        {
            List<GetAppUserDto> workersDto = new();

            IList<AppUser> workers = await Task.Run(() =>
            {
                return _userManager.Users.Where(u => u.Company.Id.ToString() == _currentUser.CompanyId && u.Id != _currentUser.Id).ToList();
            });

            foreach (var worker in workers)
            {
                GetAppUserDto workerDto = _mapper.Map<GetAppUserDto>(worker);
                workerDto.Roles = await _userManager.GetRolesAsync(worker);

                workersDto.Add(workerDto);
            }

            return workersDto;
        }
    }
}
