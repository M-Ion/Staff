using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.Domain;
using Staff.Domain.Dishes;

namespace Staff.DAL.Contracts
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IList<Group>> GetGroupData(string companyId, GroupRequest request);

        Task<IList<Group>> GetGroupData<TDto>(string companyId, GroupRequest request);

        Task<IList<Group>> GetGroupMonthlyData(string companyId, Filter filter);
    }
}
