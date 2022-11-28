using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Staff.BLL.Contracts;
using Staff.Common.Dtos.AppUser;
using Staff.Common.Dtos.Auth;
using Staff.DAL.Contracts;
using Staff.DAL.Extensions;
using Staff.Domain;
using Staff.Domain.Users;

namespace Staff.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthManager _authManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenManager _tokenManager;
        private readonly IHttpContextCookies _currentCookies;
        private readonly IHttpContextCurrentUser _currentUser;
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;

        public AuthService(
            IAuthManager authManager,
            UserManager<AppUser> userManager,
            ITokenManager tokenManager,
            IHttpContextCookies currentAuthCookies,
            IHttpContextCurrentUser currentUser,
            ICompanyRepository companyRepository,
            IMapper mapper
            )
        {
            _authManager = authManager;
            _userManager = userManager;
            _tokenManager = tokenManager;
            _currentCookies = currentAuthCookies;
            _currentUser = currentUser;
            _companyRepository = companyRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<IdentityError>> Register(RegisterManagerDto registerDto)
        {
            Company company = AddCompany(registerDto.CompanyName);

            await _companyRepository.Add(company);

            AppUser user = _mapper.Map<AppUser>(registerDto);
            user.UserName = user.Email;
            user.Company = company;

            return await _authManager.Register(user, registerDto.Password);
        }

        public async Task<IEnumerable<IdentityError>> Register(RegisterStaffDto registerDto)
        {
            Company company = await _companyRepository.Get(registerDto.CompanyId);
            WorkerUser user = _mapper.Map<WorkerUser>(registerDto);

            user.UserName = user.Email;
            user.Company = company;

            return await _authManager.Register(user, registerDto.Password, registerDto.Role.ToDescriptionString());
        }

        public async Task<AuthResponseDto> Login(LoginDto loginDto)
        {
            AppUser user = await _authManager.Login(loginDto);

            if (user.RefreshToken != null)
            {
                await _tokenManager.RevokeRefreshToken(user.RefreshToken);
            }

            AuthResponseDto authResponse = await _tokenManager.GenerateTokens(user);
            authResponse.User = CheckUserDto(user);

            return authResponse;
        }

        public Task<TokenDto> AccessToken()
        {
            string jwt = _currentCookies.Jwt;
            return Task.FromResult<TokenDto>(new TokenDto() { Token = jwt });
        }

        public async Task<AuthResponseDto> CheckUserSession()
        {
            AppUser appUser = await _userManager.FindByIdAsync(_currentUser.Id);

            AuthResponseDto responseDto = new()
            {
                Jwt = _currentCookies.Jwt,
                RefreshToken = _currentCookies.RefreshToken,
                User = CheckUserDto(appUser),
            };

            return responseDto;
        }

        public async Task<AuthResponseDto> Refresh()
        {
            AuthRequestDto authRequestDto = new() { Jwt = _currentCookies.Jwt, RefreshToken = _currentCookies.RefreshToken };

            AuthResponseDto authResponse = await _tokenManager.RefreshJwt(authRequestDto);

            return authResponse;
        }

        public async Task Logout()
        {
            if (_currentCookies.RefreshToken is null) return;

            RefreshToken stored = await _tokenManager.ExistsRefreshToken(_currentCookies.RefreshToken);

            if (stored is null) throw new Exception();

            await _tokenManager.RevokeRefreshToken(stored);
        }

        private GetAppUserDto CheckUserDto(AppUser user)
        {
            if (user is WorkerUser workerUser)
            {
                GetWorkerUserDto workerUserDto = _mapper.Map<GetWorkerUserDto>(workerUser);

                return workerUserDto;
            }

            GetAppUserDto appUserDto = _mapper.Map<GetAppUserDto>(user);

            return appUserDto;
        }

        private Company AddCompany(string name)
        {
            Company company = new Company()
            {
                Name = name
            };

            return company;
        }
    }
}
