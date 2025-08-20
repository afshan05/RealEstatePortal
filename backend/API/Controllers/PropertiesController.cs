using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PropertiesController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Property>>> GetProperties(
            [FromQuery]PropertyParams propertyParams)
        {
            var query = context.Properties
                .Sort(propertyParams.OrderBy)
                .Search(propertyParams.SearchTerm)
                .Filter(propertyParams.City, propertyParams.ListingType)
                .AsQueryable();

            var products = await PagedList<Property>.ToPagedList(query, 
                propertyParams.PageNumber, propertyParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Property>> GetProduct(int id)
        {
            var product = await context.Properties.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters() 
        {
            var city = await context.Properties.Select(x => x.City).Distinct().ToListAsync();
            var listingType = await context.Properties.Select(x => x.ListingType).Distinct().ToListAsync();

            return Ok(new {city, listingType});
        }
    }
}