using Microsoft.AspNetCore.Http;
using Staff.Common.Dtos;

namespace Staff.BLL.Contracts
{
    public interface IBlobService
    {
        Task<bool> Upload(BlobDto blobdtto, IFormFile form, Func<string, string, Task> update);
    }
}
