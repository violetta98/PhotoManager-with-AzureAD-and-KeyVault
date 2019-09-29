using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace PhotoManager.MongoRepositories.Validation
{
    public class IsNotTagOrScriptAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            ErrorMessage = ErrorMessageString;
            var currentValue = value as string;

            if (string.IsNullOrEmpty(currentValue))
            {
                return ValidationResult.Success;
            }

            var regex = new Regex(@"<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:""[^""]*"")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>");
            var matches = regex.Match(currentValue);

            return matches.Length > 0 ? new ValidationResult(ErrorMessage) : ValidationResult.Success;
        }
    }
}
