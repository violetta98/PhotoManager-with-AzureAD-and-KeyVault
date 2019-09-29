using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace PhotoManager.Web.Filters
{
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        private readonly ILogger _logger;

        public ValidateModelStateAttribute(ILogger<ValidateModelStateAttribute> logger)
        {
            _logger = logger;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var argument = context.ActionArguments.FirstOrDefault();
                var jsonValues = JsonConvert.SerializeObject(argument.Value);
                var jsonKeys = JsonConvert.SerializeObject(context.ModelState.Keys);

                _logger.LogWarning($"{argument.Key} {jsonValues} not valid.\nThese keys {jsonKeys} have not valid values.");
                context.Result = new BadRequestObjectResult(context.ModelState);
            }
        }
    }
}
