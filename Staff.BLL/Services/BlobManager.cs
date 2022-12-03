using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;

namespace Staff.BLL.Services
{
    public class BlobManager : IBlobManager
    {
        private readonly BlobServiceClient _client;

        public BlobManager(BlobServiceClient client)
        {
            _client = client;
        }

        public async Task<string> Upload(BlobDto blobDto, IFormFile file)
        {
            var container = _client.GetBlobContainerClient(blobDto.Container);

            var blob = container.GetBlobClient(blobDto.Name);

            using Stream stream = new MemoryStream();

            await file.CopyToAsync(stream);
            stream.Position = 0;

            var res = await blob.UploadAsync(stream, true);

            if (res != null)
            {
                return blob.Uri.AbsoluteUri;
            }
            else
            {
                throw new Exception();
            }
        }
    }
}
