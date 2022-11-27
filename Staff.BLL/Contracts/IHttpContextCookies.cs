namespace Staff.BLL.Contracts
{
    public interface IHttpContextCookies
    {
        public string Jwt { get; }

        public string RefreshToken { get; }
    }
}
