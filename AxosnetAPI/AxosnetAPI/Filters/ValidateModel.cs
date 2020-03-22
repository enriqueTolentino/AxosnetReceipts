using System;
using System.Linq;
using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AxosnetAPI.Filters
{
    // Validate if the information model complies with what is specified in the class
    public class ValidateModel<T> : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            try
            { 
                var param = context.ActionArguments.SingleOrDefault(p => p.Value is T);
                if (param.Value == null)
                {
                    context.Result = new BadRequestObjectResult(new { message = "Object is null" });
                    return;
                }

                if (!context.ModelState.IsValid)
                {
                    context.Result = new BadRequestObjectResult(context.ModelState);
                }
            }
            catch(Exception)
            {
                context.Result = new StatusCodeResult(500);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}
