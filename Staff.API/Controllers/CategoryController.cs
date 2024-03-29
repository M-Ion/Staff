﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.Category;
using Staff.Common.Filtering;
using Staff.Common.Grouping;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IList<CategoryDto>>> Get()
        {
            return Ok(await _categoryService.GetEvery());
        }

        [HttpGet("Statistics/{id}")]
        [Authorize]
        public async Task<ActionResult<IList<Group>>> GetSpecificStatistics(string id, [FromQuery] GroupStatsBy by)
        {
            return Ok(await _categoryService.GetStatsByCategory(id, by));
        }

        [HttpGet("Statistics")]
        [Authorize]
        public async Task<ActionResult<IList<Group>>> GetStatistics()
        {
            return Ok(await _categoryService.GetCategoriesStats());
        }

        [HttpPost("Filtered")]
        [Authorize]
        public async Task<ActionResult<FilteredResult<CategoryDto>>> GetFiltered([FromBody] IList<Filter> filters)
        {
            return Ok(await _categoryService.Get(filters));
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<BaseDto>> Post([FromBody] CreateCategoryDto dto)
        {
            BaseDto baseDto = await _categoryService.Add(dto);
            return Ok(baseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Put(string id, [FromBody] UpdateCategoryDto dto)
        {
            await _categoryService.Update(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Delete(string id)
        {
            await _categoryService.Delete(id);
            return NoContent();
        }
    }
}
