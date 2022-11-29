using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Note;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        readonly INoteService _noteService;

        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<IList<GetNoteDto>>> Get()
        {
            return Ok(await _noteService.GetEvery());
        }

        [HttpGet("Worker")]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult<IList<GetNoteDto>>> GetOfUser()
        {
            return Ok(await _noteService.GetEveryOfUser());
        }

        [HttpPost]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult<BaseDto>> Post([FromBody] CreateNoteDto dto)
        {
            BaseDto baseDto = await _noteService.Add(dto);
            return Ok(baseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult> Put(string id, [FromBody] UpdateNoteDto dto)
        {
            await _noteService.Update(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Waiter")]
        public async Task<ActionResult> Delete(string id)
        {
            await _noteService.Delete(id);
            return NoContent();
        }
    }
}
