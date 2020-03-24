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
                User user = authLogic.loginValidate(login);

                if(user == null)
                {
                    return BadRequest(new { errorMessage = "Invalid Email or Password" });
                }

                return Ok(new TokenViewModel { token = authLogic.generarTokenSession(user) });
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
                    user.Password = authLogic.Encrypt(user.Password);
                    using (db = new AxosnetAPIContext())
                    {
                        db.Users.Add(user);
                        db.SaveChanges();

                        return Ok();
                    }
                }

                return BadRequest(new { errorMessage = "The user already exists" });
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
                return StatusCode(500, ex);
            }
        }
    }
}