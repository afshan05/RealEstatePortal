using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PropertiesController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Property>>> GetProperties()
        {
            return await context.Properties.ToListAsync();
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var property = await context.Properties.FindAsync(id);

            if (property == null) return NotFound();

            return property;
        }
    }
}