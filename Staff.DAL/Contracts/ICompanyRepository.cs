using Staff.Domain;

namespace Staff.DAL.Contracts
{
    public interface ICompanyRepository
    {
        Task Add(Company entity);

        Task<Company> Get(string id);

        Task Update(Company entity);
    }
}
