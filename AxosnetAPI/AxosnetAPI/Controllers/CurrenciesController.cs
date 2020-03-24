using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AxosnetAPI.Models;
using AxosnetAPI.Filters;
using Microsoft.AspNetCore.Authorization;

namespace AxosnetAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CurrenciesController : ControllerBase
    {
        private AxosnetAPIContext db;

        // GET: api/Currencies/GetAll
        // Get all Currencies from database
        [HttpGet]
        public ActionResult GetAll()
        {
            try
            {
                using (db = new AxosnetAPIContext())
                {
                    List<Currency> currencies = db.Currencies.ToList();
                    return Ok(currencies);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // GET: api/Receipts/GetById/5
        // Get Receipt data from valid id
        [HttpGet("{id:int?}")]
        [ServiceFilter(typeof(ValidateEntityExists<Currency>))]
        public ActionResult GetById(int? id)
        {
            try
            {
                using (db = new AxosnetAPIContext())
                {
                    Currency receipt = db.Currencies.
                        FirstOrDefault(currency => currency.IdCurrency == id);

                    return Ok(receipt);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}