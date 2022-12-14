using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Company;
using Staff.Common.Grouping;

namespace Staff.BLL.Contracts
{
    public interface ICompanyService
    {
        Task<CompanyDto> Get();

        Task Update(UpdateCompanyDto updateDto);

        Task<IList<GetAppUserDto>> GetWorkers();

        Task<IList<Group>> GetWorkersStats();


        Task<IList<Group>> GetStatsByWorker(string id, GroupStatsBy by = GroupStatsBy.Year);
    }
}
