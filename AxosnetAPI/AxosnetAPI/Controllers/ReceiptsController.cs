using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AxosnetAPI.Models;
using Microsoft.EntityFrameworkCore;
using AxosnetAPI.Filters;

namespace AxosnetAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private AxosnetAPIContext db;
        // GET: api/Receipts/GetAll
        // Get all receipts from database
        [HttpGet]
        public ActionResult GetAll()
        {
            try
            {
                using (db = new AxosnetAPIContext())
                {
                    List<Receipt> receipts = db.Receipts
                        .Include(receipt => receipt.Currency).ToList();
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
                using (db = new AxosnetAPIContext())
                {
                    Receipt receipt = db.Receipts.
                        Include(receipt => receipt.Currency).
                        FirstOrDefault(receipt => receipt.IdReceipt == id.Value);

                    if(receipt == null)
                    {
                        return NotFound();
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
                using(db = new AxosnetAPIContext())
                {
                    db.Add(receipt);
                    db.SaveChanges();

                    return Ok(receipt);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // PUT: api/Receipts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
