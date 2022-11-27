using Staff.Common.Dtos.Note;

namespace Staff.Common.Dtos.AppUser
{
    public class GetWorkerUserDto : GetAppUserDto
    {
        public IList<GetNoteDto> Notes { get; set; }
    }
}
