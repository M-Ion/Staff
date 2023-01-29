using Staff.BLL.Contracts;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.BLL.Services
{
    public class StatsService<TDto>
    {
        readonly IOrderRepository _orderRepo;
        readonly IHttpContextCurrentUser _user;

        public StatsService(
            IHttpContextCurrentUser user,
            IOrderRepository orderRepo
            )
        {
            _user = user;
            _orderRepo = orderRepo;
        }

        protected async Task<IList<Group>> GetStats(string groupBy)
        {
            GroupRequest request = new() { Prop = groupBy };
            return await _orderRepo.GetGroupData<TDto>(_user.CompanyId, request);
        }

        protected async Task<IList<Group>> GetSpecificStats(object value, string groupBy, GroupStatsBy by = GroupStatsBy.Year)
        {
            Filter filter = new() { Prop = groupBy, Operation = Op.Eq, Value = value };

            if (by == GroupStatsBy.Year)
            {
                GroupRequest request = new() { Prop = "created.Year", Filter = filter };
                return (await _orderRepo.GetGroupData(_user.CompanyId, request)).OrderBy(g => g.Key).ToList();
            }

            var result = await _orderRepo.GetGroupMonthlyData(_user.CompanyId, filter);
            return result
                .Select(g => new Group { Key = (object)($"{g.Key.Month}/{g.Key.Year}"), Count = g.Count, Sum = g.Sum }).ToList();
        }
    }
}
