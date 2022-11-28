using Staff.Domain;

namespace Staff.DAL.Contracts
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<bool> Exists(Guid id, string companyId);

        Task<T> Get(Guid id, string companyId);

        Task<IList<T>> GetEvery(string companyId);

        Task<T> Add(T entity, string companyId);

        Task Update(T entity);

        Task Remove(Guid id, string companyId);
    }
}
