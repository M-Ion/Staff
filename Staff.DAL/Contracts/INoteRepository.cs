using Staff.Common.Dtos.Note;
using Staff.Domain;

namespace Staff.DAL.Contracts
{
    public interface INoteRepository : IGenericRepository<Note>
    {
        Task<IList<Note>> GetEvery(string companyId, string userId);
    }
}
