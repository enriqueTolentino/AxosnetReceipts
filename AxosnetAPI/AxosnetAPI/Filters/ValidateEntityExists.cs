using System;
using Microsoft.AspNetCore.Mvc.Filters;
using AxosnetAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AxosnetAPI.Filters
{
    // Filter to validate if the data received exist in the database
    public class ValidateEntityExists<T> : IActionFilter where T : class
    {
        private AxosnetAPIContext db;

        public void OnActionExecuting(ActionExecutingContext context)
        {
            try
            {
                using (db = new AxosnetAPIContext())
                {
                    int? id = null;

                    if (context.ActionArguments.ContainsKey("id"))
                    {
                        id =  Convert.ToInt32(context.ActionArguments["id"]);
                    }
                    else
                    {
                        context.Result = new BadRequestObjectResult(new { message = "Bad id parameter"});
                        return;
                    }

                    var entity = db.Set<T>().Find(id);
                    if (entity == null)
                    {
                        context.Result = new NotFoundResult();
                    }
                }
            }
            catch (Exception)
            {
                context.Result = new StatusCodeResult(500);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}
