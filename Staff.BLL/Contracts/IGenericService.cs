using Staff.Common.Dtos;

namespace Staff.BLL.Contracts
{
    public interface IGenericService<TEntity, T, TGet, TCreate, TUpdate>
    {
        Task<BaseDto> Add(TCreate createDto);

        Task<T> Get(string id);

        Task<IList<TGet>> GetEvery();

        Task Update(string id, TUpdate updateDto);

        Task Delete(string id);
    }
}
