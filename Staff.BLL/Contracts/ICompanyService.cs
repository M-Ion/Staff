using Staff.Common.Dtos.AppUser;

namespace Staff.BLL.Contracts
{
    public interface ICompanyService
    {
        Task<IList<GetAppUserDto>> GetWorkers();
    }
}
