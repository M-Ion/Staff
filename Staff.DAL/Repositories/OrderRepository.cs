using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using Staff.Domain;
using System.Linq.Expressions;

namespace Staff.DAL.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        readonly StaffDbContext _context;
        readonly IMapper _mapper;

        public OrderRepository(StaffDbContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<Group>> GetGroupData<TDto>(string companyId, GroupRequest request)
        {
            IList<Group> result = new List<Group>();
            IList<Order> items = new List<Order>();

            if (request.Filter is not null)
            {
                FilteredRequest filteredRequest = new FilteredRequest() { Filters = new List<Filter>() { request.Filter } };
                items = (await GetAllAsyncProcessed(companyId, filteredRequest)).Items;

            }
            else
            {
                items = await _context.Set<Order>().ToListAsync();
            }

            Expression<Func<Order, object>> groupExp = BuildExpression(request.Prop);

            try
            {
                result = System.Linq.Enumerable.GroupBy(
                    items,
                    groupExp.Compile(),
                    (key, g) => new Group() { Key = (object)_mapper.Map<TDto>(key), Count = (ulong)g.Count(), Sum = g.Sum(l => l.Dish.Price) }
                    ).ToList();
            }
            catch
            {
                throw new Exception();
            }

            return result;
        }

        public async Task<IList<Group>> GetGroupData(string companyId, GroupRequest request)
        {
            IList<Group> result = new List<Group>();
            IList<Order> items = new List<Order>();

            if (request.Filter is not null)
            {
                FilteredRequest filteredRequest = new FilteredRequest() { Filters = new List<Filter>() { request.Filter } };
                items = (await GetAllAsyncProcessed(companyId, filteredRequest)).Items;

            }
            else
            {
                items = await _context.Set<Order>().ToListAsync();
            }

            Expression<Func<Order, object>> groupExp = BuildExpression(request.Prop);

            try
            {
                result = System.Linq.Enumerable.GroupBy(
                    items,
                    groupExp.Compile(),
                    (key, g) => new Group() { Key = (object)key, Count = (ulong)g.Count(), Sum = g.Sum(l => l.Dish.Price) }
                    ).ToList();
            }
            catch
            {
                throw new Exception();
            }

            return result;
        }

        public async Task<IList<Group>> GetGroupMonthlyData(string companyId, Filter filter)
        {
            IList<Order> items = new List<Order>();

            if (filter is not null)
            {
                FilteredRequest filteredRequest = new FilteredRequest() { Filters = new List<Filter>() { filter } };
                items = (await GetAllAsyncProcessed(companyId, filteredRequest)).Items;

            }
            else
            {
                items = await _context.Set<Order>().ToListAsync();
            }

            IList<Group> result = items.GroupBy(o => new { Year = o.Created.Year, Month = o.Created.Month }, 
                (key, g) => new Group() { Key = (object)key, Count = (ulong)g.Count(), Sum = g.Sum(l => l.Dish.Price) })
                .ToList();

            return result;
        }

        private static Expression<Func<Order, object>> BuildExpression(string values)
        {
            ParameterExpression param = Expression.Parameter(typeof(Order));
            MemberExpression member = GetMemberExpression(param, values);

            return Expression.Lambda<Func<Order, object>>(Expression.Convert(member, typeof(Object)), param);
        }

        private static MemberExpression GetMemberExpression(ParameterExpression param, string prop)
        {
            string[] props = prop.Split('.');
            MemberExpression member = Expression.Property(param, props[0]);

            for (int i = 1; i < props.Length; i++)
            {
                member = Expression.Property(member, props[i]);
            }

            return member;
        }
    }
}
