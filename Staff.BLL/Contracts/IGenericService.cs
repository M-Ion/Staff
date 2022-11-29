using Staff.Common.Dtos;
using Staff.Domain;

namespace Staff.BLL.Contracts
{
    public interface IGenericService<TEntity, T, TGet, TCreate, TUpdate>
        where TEntity : BaseEntity
        where T : class
        where TGet : class
        where TCreate : class
        where TUpdate : class
    {
        Task<BaseDto> Add(TCreate createDto);

        Task<T> Get(string id);

        Task<IList<TGet>> GetEvery();

        Task Update(string id, TUpdate updateDto);

        Task Delete(string id);

        Task<bool> Exists(string id);
    }
}
