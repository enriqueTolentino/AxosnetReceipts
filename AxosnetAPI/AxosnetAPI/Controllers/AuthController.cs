using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AxosnetAPI.BusinessLogic;
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

        [HttpPost]
        public ActionResult Login([FromBody]LoginViewModel login)
        {
            try
            {
                return Ok(new TokenViewModel { token = authLogic.generarTokenSession(login) });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
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