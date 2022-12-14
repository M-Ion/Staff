using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Company;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using Staff.Domain;
using Staff.Domain.Users;

namespace Staff.BLL.Services
{
    public class CompanyService : StatsService<GetAppUserDto>, ICompanyService
    {
        readonly IHttpContextCurrentUser _currentUser;
        readonly UserManager<AppUser> _userManager;
        readonly ICompanyRepository _companyRepository;
        readonly IMapper _mapper;

        public CompanyService(
            IHttpContextCurrentUser currentUser,
            UserManager<AppUser> userManager,
            IMapper mapper,
            IOrderRepository orderRepo,
            ICompanyRepository companyRepository
            ) : base(currentUser, orderRepo)
        {
            _currentUser = currentUser;
            _userManager = userManager;
            _mapper = mapper;
            _companyRepository = companyRepository;
        }

        public async Task<CompanyDto> Get()
        {
            Company entity = await _companyRepository.Get(_currentUser.CompanyId);
            return _mapper.Map<CompanyDto>(entity);
        }

        public async Task Update(UpdateCompanyDto updateDto)
        {
            Company entity = await _companyRepository.Get(_currentUser.CompanyId);
            _mapper.Map(updateDto, entity);

            await _companyRepository.Update(entity);
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

        public async Task<IList<Group>> GetWorkersStats()
        {
            return await GetStats("user");
        }

        public async Task<IList<Group>> GetStatsByWorker(string id, GroupStatsBy by = GroupStatsBy.Year)
        {
            return await GetSpecificStats(id, "user.Id", by);
        }
    }
}
