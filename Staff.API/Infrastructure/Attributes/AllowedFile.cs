using System.ComponentModel.DataAnnotations;

namespace Staff.API.Infrastructure.Attributes
{
    public class AllowedFileAttribute : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedFileAttribute(string[] extensions)
        {
            _extensions = extensions;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;

            if (file != null)
            {
                var extension = Path.GetExtension(file.FileName);
                if (!_extensions.Contains(extension.ToLower()))
                {
                    throw new Exception();
                }
            }

            return ValidationResult.Success;
        }
    }
}
