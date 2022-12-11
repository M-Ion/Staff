using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Note;
using Staff.DAL.Contracts;
using Staff.Domain;
using Staff.Domain.Users;

namespace Staff.BLL.Services
{
    public class NoteService : GenericService<Note, GetNoteDto, GetNoteDto, CreateNoteDto, UpdateNoteDto>, INoteService
    {
        readonly INoteRepository _noteRepo;

        public NoteService(
            IMapper mapper,
            IGenericRepository<Note> repo,
            IHttpContextCurrentUser user,
            INoteRepository noteRepo,
            IOrderRepository orderRepo
            ) : base(mapper, repo, user, orderRepo)
        {
            _noteRepo = noteRepo;
        }

        public async Task<IList<GetNoteDto>> GetEveryOfUser()
        {
            IList<Note> notes = await _noteRepo.GetEvery(_user.CompanyId, _user.Id);
            return _mapper.Map<IList<GetNoteDto>>(notes);
        }

        public override async Task<BaseDto> Add(CreateNoteDto createDto)
        {

            var entity = _mapper.Map<Note>(createDto);
            entity.UserId = _user.Id;

            Guid id = (await _noteRepo.Add(entity, _user.CompanyId)).Id;

            return new BaseDto() { Id = id };
        }

        public override async Task<bool> Exists(string id)
        {
            Note entity = await _noteRepo.Get(new Guid(id), _user.CompanyId);

            if (entity is not null && entity.User.Id == _user.Id)
            {
                return true;
            }

            return false;
        }
    }
}
