using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Staff.API.Infrastructure.Extensions;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Auth;

namespace Staff.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthService authService, IConfiguration config)
        {
            _authService = authService;
            _configuration = config;
        }

        [HttpPost("Register/Manager")]
        public async Task<IActionResult> Register([FromBody] RegisterManagerDto registerDto)
        {
            var errors = await _authService.Register(registerDto);

            if (errors.Any()) return BadRequest(errors);

            return Ok();
        }

        [HttpPost("Register/Staff")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Register([FromBody] RegisterStaffDto registerDto)
        {
            var errors = await _authService.Register(registerDto);

            if (errors.Any()) return BadRequest(errors);

            return Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<AuthResponseDto>> CheckUserSession()
        {
            AuthResponseDto responseDto = await _authService.CheckUserSession();

            return Ok(responseDto);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            AuthResponseDto authResponse = await _authService.Login(loginDto);

            SetCookieDto jwtCookieDto = new()
            {
                Name = "jwt",
                Value = authResponse.Token,
                Expires = DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:DurationInMonths"]))
            };

            SetCookieDto refreshTokenCookieDto = new()
            {
                Name = "refreshToken",
                Value = authResponse.RefreshToken,
                Expires = DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:DurationInMonths"]))
            };

            return Ok(authResponse).SetCookie(Response, jwtCookieDto).SetCookie(Response, refreshTokenCookieDto);
        }

        [HttpGet("Token")]
        public async Task<ActionResult<TokenDto>> AccessToken()
        {
            TokenDto result = await _authService.AccessToken();
            return Ok(result);
        }

        [HttpPost("Refresh")]
        public async Task<ActionResult<AuthResponseDto>> RefreshSession()
        {
            AuthResponseDto authResponse = await _authService.Refresh();

            SetCookieDto jwtCookieDto = new()
            {
                Name = "jwt",
                Value = authResponse.Token,
                Expires = DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:DurationInMonths"]))
            };

            return Ok(authResponse).SetCookie(Response, jwtCookieDto);
        }


        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _authService.Logout();

            return Ok()
                .ClearCookie(Response, "jwt")
                .ClearCookie(Response, "refreshToken");
        }
    }
}
