using Staff.Common.Dtos.Note;
using Staff.Domain;

namespace Staff.BLL.Contracts
{
    public interface INoteService : IGenericService<Note, GetNoteDto, GetNoteDto, CreateNoteDto, UpdateNoteDto>
    {
        Task<IList<GetNoteDto>> GetEveryOfUser();
    }
}
