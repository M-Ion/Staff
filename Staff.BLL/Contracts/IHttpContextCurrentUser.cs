namespace Staff.BLL.Contracts
{
    public interface IHttpContextCurrentUser
    {
        public string Id { get; }

        public string CompanyId { get; }
    }
}
