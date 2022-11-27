using Staff.Common.Dtos.Company;
using Staff.Domain;

namespace Staff.Common.Dtos.AppUser
{
    public class GetAppUserDto : BaseDto
    {
        public GetCompanyDto Company { get; set; }

        public string FullName { get; set; }
    }
}
