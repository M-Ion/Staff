using Microsoft.AspNetCore.Http;
using Staff.Common.Dtos;

namespace Staff.BLL.Contracts
{
    public interface IBlobManager
    {
        Task<string> Upload(BlobDto blobDto, IFormFile file);
    }
}
