﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff.API.Infrastructure.Attributes;
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

        [HttpPost()]
        [Consumes("multipart/form-data")]
        [Authorize(Roles = "Manager")]
        [AllowedFile(new string[] { ".jpg", ".webp", ".jpeg", ".png" })]
        public async Task<ActionResult> Post([FromForm] IFormFile file)
        {
            BlobDto blobDto = new() { Container = BlobConstants.DishContainer };

            bool uploaded = await _blobService.Upload(blobDto, file, _dishService.UpdateBlob);

            return uploaded ? Ok() : BadRequest();
        }
    }
}
