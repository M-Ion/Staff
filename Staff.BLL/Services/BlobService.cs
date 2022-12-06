using Microsoft.AspNetCore.Http;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;

namespace Staff.BLL.Services
{
    public class BlobService : IBlobService
    {
        readonly IBlobManager _blobManager;

        public BlobService(IBlobManager blobManager)
        {
            _blobManager = blobManager;
        }

        public async Task<bool> Upload(BlobDto blobDto, IFormFile file, Func<string, string, Task> update)
        {
            string fileName = file.FileName.Split('.').First();
            blobDto.Name = fileName;

            string uri = await _blobManager.Upload(blobDto, file);

            await update(fileName, uri);

            return uri != null;
        }
    }
}
