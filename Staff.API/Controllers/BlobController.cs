using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.BLL.Contracts;
using Staff.Common.Constants;
using Staff.Common.Dtos;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlobController : ControllerBase
    {
        readonly IBlobService _blobService;
        readonly IDishService _dishService;

        public BlobController(IBlobService blobService, IDishService dishService)
        {
            _blobService = blobService;
            _dishService = dishService;
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Post([FromForm] IFormFile form)
        {
            BlobDto blobDto = new() { Container = BlobConstants.DishContainer };

            bool uploaded = await _blobService.Upload(blobDto, form, _dishService.UpdateBlob);

            return uploaded ? Ok() : BadRequest();
        }
    }
}
