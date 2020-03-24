using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AxosnetAPI.Models;
using Microsoft.EntityFrameworkCore;
using AxosnetAPI.Filters;
using Microsoft.AspNetCore.Authorization;
using AxosnetAPI.BusinessLogic;

namespace AxosnetAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private AxosnetAPIContext db;
        private AuthLogic authLogic = new AuthLogic();
        // GET: api/Receipts/GetAll
        // Get all receipts from database
        [HttpGet]
        public ActionResult GetAll()
        {
            try
            {
                string token = Request.Headers["Authorization"].First();
                User user = authLogic.GetUserByToken(token);
                using (db = new AxosnetAPIContext())
                {
                    List<Receipt> receipts = db.Receipts
                        .Include(receipt => receipt.Currency)
                        .Where(r => r.IdUser == user.IdUser).ToList();
                    return Ok(receipts);
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // GET: api/Receipts/GetById/5
        // Get Receipt data from valid id
        [HttpGet("{id:int?}")]
        [ServiceFilter(typeof(ValidateEntityExists<Receipt>))]
        public ActionResult GetById(int? id)
        {
            try
            {
                string token = Request.Headers["Authorization"].First();
                User user = authLogic.GetUserByToken(token);

                using (db = new AxosnetAPIContext())
                {
                    Receipt receipt = db.Receipts.
                        Include(receipt => receipt.Currency).
                        FirstOrDefault(receipt => receipt.IdReceipt == id.Value);

                    if(receipt.IdUser != user.IdUser)
                    {
                        return Unauthorized(new { errorMessage = "You can't see this"});
                    }

                    return Ok(receipt);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // POST: api/Receipts/Create
        // Insert receipt data in database
        [HttpPost]
        [ServiceFilter(typeof(ValidateModel<Receipt>))]
        public ActionResult Create([Bind("ProviderCode,Amount,Date,Comments,IdCurrency")]
                        [FromBody] Receipt receipt)
        {
            try
            {
                string token = Request.Headers["Authorization"].First();
                User user = authLogic.GetUserByToken(token);
                receipt.IdUser = user.IdUser;
                using (db = new AxosnetAPIContext())
                {
                    db.Receipts.Add(receipt);
                    db.SaveChanges();

                    return Ok(receipt);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // Post: api/Receipts/5
        // Update receipt data in database
        [HttpPost("{id:int?}")]
        [ServiceFilter(typeof(ValidateEntityExists<Receipt>))]
        [ServiceFilter(typeof(ValidateModel<Receipt>))]
        public ActionResult Edit(int? id, [Bind("IdReceipt,ProviderCode,Amount,Date,Comments,IdCurrency")]
                        [FromBody] Receipt receipt)
        {
            try
            {
                if(receipt.IdUser == null)
                {
                    return Unauthorized(new { errorMessage = "You can't do that" });
                }
                using (db = new AxosnetAPIContext())
                {
                    db.Update(receipt);
                    db.SaveChanges();

                    return Ok(receipt);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // DELETE: api/ApiWithActions/5
        // Delete a row data in receipt table
        [HttpDelete("{id:int?}")]
        [ServiceFilter(typeof(ValidateEntityExists<Receipt>))]
        public ActionResult Delete(int? id)
        {
            try
            {
                using (db = new AxosnetAPIContext())
                {
                    Receipt receipt = db.Receipts.Find(id);
                    db.Receipts.Remove(receipt);
                    db.SaveChanges();

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
