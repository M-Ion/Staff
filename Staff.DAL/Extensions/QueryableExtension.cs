using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Staff.Common.Exceptions;
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

        public async static Task<FilteredResult<T>> Query<T>(this IQueryable<T> query, FilteredRequest filteredRequest) where T : BaseEntity
        {
            query = query.ApplyFilters(filteredRequest.Filters);

            int total = await query.CountAsync();

            FilteredResult<T> result = new()
            {
                Total = total,
                Items = await query.ToListAsync()
            };

            return result;
        }

        public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, IList<Filter> filters)
        {
            if (!filters.Any())
            {
                return query;
            }
            try
            {
                Expression<Func<T, bool>> lambdas = BuildExpression<T>(filters);

                query = System.Linq.Queryable.Where(query, lambdas);

                return query;

            }
            catch (Exception e)
            {
                throw new InvalidFilteringException(e.Message);
            }

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
            MemberExpression member = GetMemberExpression(param, filter.Prop);
            object value = ConvertConstantValue(member, filter);

            Expression leftHand = member.Type == typeof(System.Guid) ? Expression.Call(member, "ToString", Type.EmptyTypes) : member;
            ConstantExpression constant = Expression.Constant(value);

            switch (filter?.Operation)
            {
                case Op.Eq:
                    return Expression.Equal(leftHand, constant);
                case Op.Gt:
                    return Expression.GreaterThan(leftHand, constant);
                case Op.GtEq:
                    return Expression.GreaterThanOrEqual(leftHand, constant);
                case Op.Lt:
                    return Expression.LessThan(leftHand, constant);
                case Op.LtEq:
                    return Expression.LessThanOrEqual(leftHand, constant);
                case Op.Ct:
                    MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                    return Expression.Call(leftHand, method, constant);
                default:
                    return null;
            }
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

        private static object ConvertConstantValue(MemberExpression member, Filter filter)
        {
            object value;

            if (member.Type.IsEnum)
            {
                value = Enum.ToObject(member.Type, filter.Value);
            }
            else if (member.Type == typeof(System.Guid))
            {
                value = filter.Value;
            }
            else
            {
                value = Convert.ChangeType(filter.Value, member.Type);
            }

            return value;
        }
    }
}
