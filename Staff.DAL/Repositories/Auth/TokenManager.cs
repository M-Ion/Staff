using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Staff.Common.Dtos.Auth;
using Staff.DAL.Constants;
using Staff.DAL.Contracts;
using Staff.Domain;
using Staff.Domain.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Staff.DAL.Repositories.Auth
{
    public class TokenManager : ITokenManager
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;
        private readonly StaffDbContext _context;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public TokenManager(
            IConfiguration config, 
            UserManager<AppUser> userManager, 
            StaffDbContext context,
            TokenValidationParameters tokenValidationParameters
            )
        {
            _configuration = config;
            _userManager = userManager;
            _context = context;
            _tokenValidationParameters = tokenValidationParameters;
        }

        public async Task<AuthResponseDto> GenerateTokens(AppUser user)
        {
            var jwt = await GenerateJwt(user);
            var refreshToken = await GenerateRefreshToken(user, jwt);

            return new AuthResponseDto()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwt),
                RefreshToken = refreshToken,
            };
        }

        public async Task<AuthResponseDto> RefreshJwt(AuthRequestDto authRequestDto)
        {
            try
            {
                _tokenValidationParameters.ValidateLifetime = false;

                ClaimsPrincipal jwtVerification = new JwtSecurityTokenHandler()
                    .ValidateToken(authRequestDto.Jwt, _tokenValidationParameters, out SecurityToken validatedToken);

                _tokenValidationParameters.ValidateLifetime = true;

                if (!IsJwtValid(jwtVerification, validatedToken))
                {
                    throw new Exception();
                }

                var storedRefreshToken = await _context.Set<RefreshToken>().FirstOrDefaultAsync(t => t.Value == authRequestDto.RefreshToken);

                if (!IsRefreshTokenValid(storedRefreshToken, jwtVerification))
                {
                    await RevokeRefreshToken(storedRefreshToken);
                    throw new Exception();
                }

                var user = await _userManager.FindByIdAsync(storedRefreshToken.AppUserId);

                var jwt = await GenerateJwt(user);

                storedRefreshToken.JwtId = jwt.Id;

                await _context.SaveChangesAsync();

                return new AuthResponseDto
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(jwt),
                    RefreshToken = storedRefreshToken.Value
                };
            }
            catch (Exception)
            {
                throw new Exception();
            }
            finally
            {
                _tokenValidationParameters.ValidateLifetime = true;
            }
        }

        public async Task RevokeRefreshToken(RefreshToken refreshToken)
        {
            _context.Set<RefreshToken>().Remove(refreshToken);
            await _context.SaveChangesAsync();
        }

        private async Task<JwtSecurityToken> GenerateJwt(AppUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = await PrepareClaims(user);

            var jwt = new JwtSecurityToken(
                issuer: _configuration["JwtConfig:Issuer"],
                audience: _configuration["JwtConfig:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["JwtConfig:DurationInMinutes"])),
                signingCredentials: credentials
            );

            return jwt;
        }

        public async Task<RefreshToken> ExistsRefreshToken(string token)
        {
            RefreshToken stored = await _context.Set<RefreshToken>().FirstOrDefaultAsync(e => e.Value == token);

            return stored;
        }

        private async Task<IEnumerable<Claim>> PrepareClaims(AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
            var userClaims = await _userManager.GetClaimsAsync(user);

            var claims = new List<Claim>()
            {
                new Claim("uid", user.Id),
                new Claim("company", user.Company.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            }
            .Union(userClaims).Union(roleClaims);

            return claims;
        }

        private async Task<string> GenerateRefreshToken(AppUser user, JwtSecurityToken jwt)
        {
            RefreshToken refreshToken = new()
            {
                JwtId = jwt.Id,
                Value = await _userManager.GenerateUserTokenAsync(user, TokenConstants.Provider, TokenConstants.RefreshTokenPurpose),
                Expires = DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:DurationInMonths"])),
                AppUserId = user.Id
            };

            await _context.Set<RefreshToken>().AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return refreshToken.Value;
        }

        // Validations

        private bool IsJwtValid(ClaimsPrincipal tokenVerification, SecurityToken validatedToken)
        {
            if (validatedToken is JwtSecurityToken jwtSecurity)
            {
                if (!jwtSecurity.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
                {
                    return false;
                }
            }

            long expiryDate = long.Parse(tokenVerification.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp).Value);

            if (expiryDate > ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds())
            {
                return false;
            }

            return true;
        }

        private bool IsRefreshTokenValid(RefreshToken storedRefreshToken, ClaimsPrincipal jwt)
        {
            if (storedRefreshToken is null)
            {
                return false;
            }

            var jti = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value;

            if (storedRefreshToken.JwtId != jti)
            {
                return false;
            }

            if (storedRefreshToken.Expires < DateTime.UtcNow)
            {
                return false;
            }

            return true;
        }
    }
}
