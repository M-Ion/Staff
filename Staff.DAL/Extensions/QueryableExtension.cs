using AutoMapper;
using AutoMapper.QueryableExtensions;
using MarvelCU.Common.Models.Processing;
using Microsoft.EntityFrameworkCore;
using Staff.Common.Filtering;
using Staff.Domain;
using System.Linq.Expressions;
using System.Reflection;

namespace Staff.DAL.Extensions
{
    public static class QueryableExtension
    {
        public async static Task<FilteredResult<TDto>> Query<T, TDto>(this IQueryable<T> query, FilteredRequest filteredRequest, IMapper mapper) where T : BaseEntity where TDto : class
        {
            query = query.ApplyFilters(filteredRequest.Filters);

            int total = await query.CountAsync();

            FilteredResult<TDto> result = new()
            {
                Total = total,
                Items = await query.ProjectTo<TDto>(mapper.ConfigurationProvider).ToListAsync()
            };

            return result;
        }

        public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, IList<Filter> filters)
        {
            if (!filters.Any())
            {
                return query;
            }

            Expression<Func<T, bool>> lambdas = BuildExpression<T>(filters);

            query = System.Linq.Queryable.Where(query, lambdas);

            return query;
        }

        private static Expression<Func<T, bool>> BuildExpression<T>(IList<Filter> filters)
        {
            ParameterExpression param = Expression.Parameter(typeof(T));
            Expression exp = default;

            // Order filters by prop
            filters = filters.OrderBy(f => f.Prop).ToList();

            Filter current;

            for (int i = 0; i < filters.Count; i++)
            {
                if (i == 0)
                {
                    exp = GetExpression<T>(param, filters[i]);
                    current = filters[i];
                    continue;
                }

                // If is multiple filters per prop apply or operator
                if (filters[i].Prop == filters[i - 1].Prop)
                {
                    exp = Expression.Or(exp, GetExpression<T>(param, filters[i]));
                }
                // If is different filter prop apply and operator
                else
                {
                    exp = Expression.AndAlso(exp, GetExpression<T>(param, filters[i]));
                }

            }

            return Expression.Lambda<Func<T, bool>>(exp, param);
        }

        private static Expression GetExpression<T>(ParameterExpression param, Filter filter)
        {
            MemberExpression member = Expression.Property(param, filter.Prop);

            object value;

            if (member.Type.IsEnum) value = Enum.ToObject(member.Type, filter.Value);
            else value = Convert.ChangeType(filter.Value, member.Type);

            ConstantExpression constant = Expression.Constant(value);

            switch (filter?.Operation)
            {
                case Op.Eq:
                    return Expression.Equal(member, constant);
                case Op.Gt:
                    return Expression.GreaterThan(member, constant);
                case Op.GtEq:
                    return Expression.GreaterThanOrEqual(member, constant);
                case Op.Lt:
                    return Expression.LessThan(member, constant);
                case Op.LtEq:
                    return Expression.LessThanOrEqual(member, constant);
                case Op.Ct:
                    MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                    return Expression.Call(member, method, constant);
                default:
                    return null;
            }
        }
    }
}
