using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AxosnetAPI.BusinessLogic;
using AxosnetAPI.Filters;
using AxosnetAPI.Models;
using AxosnetAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AxosnetAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthLogic authLogic = new AuthLogic();
        private AxosnetAPIContext db;

        [HttpPost]
        [ServiceFilter(typeof(ValidateModel<LoginViewModel>))]
        public ActionResult Login([FromBody]LoginViewModel login)
        {
            try
            {
                return Ok(new TokenViewModel { token = authLogic.generarTokenSession(login) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        [HttpPost]
        [ServiceFilter(typeof(ValidateModel<User>))]
        public ActionResult CreateUser([FromBody]User user)
        {
            try
            {
                if (authLogic.validateUserNotExists(user.Email))
                {
                    using (db = new AxosnetAPIContext())
                    {
                        db.Users.Add(user);
                        db.SaveChanges();

                        return Ok(user);
                    }
                }

                return BadRequest("The user already exists");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [Authorize]
        [HttpGet]
        public ActionResult GetUserSession()
        {
            try
            {
                return Ok(authLogic.GeUserSession(Request.Headers["Authorization"].First()));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}