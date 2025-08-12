using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{

    public class FavoriteController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<FavoriteDto>> GetFavorites()
        {
            var favorite = await RetrieveFavorite();

            if (favorite == null) return NoContent();

            return favorite.ToDto();
        }

        [HttpPost]
        public async Task<ActionResult<FavoriteDto>> AddFavorite(int propertyId)
        {
            var favorite = await RetrieveFavorite();

            favorite ??= CreateFavorite();

            var property = await context.Properties.FindAsync(propertyId);

            if (property == null) return BadRequest("Property not found");

            favorite.AddItem(property);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetFavorites), favorite.ToDto());

            return BadRequest("Problem adding to favorites");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveFavorite(int propertyId)
        {
            var favorite = await RetrieveFavorite();

            if (favorite == null) return BadRequest("Unable to retrieve favorites");

            favorite.RemoveItem(propertyId);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Problem removing from favorites");
        }

        private Favorite CreateFavorite()
        {
            var favoriteId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("favoriteId", favoriteId, cookieOptions);
            var favorite = new Favorite { FavoriteId = favoriteId };
            context.Favorites.Add(favorite);
            return favorite;
        }

        private async Task<Favorite?> RetrieveFavorite()
        {
            return await context.Favorites
                .Include(x => x.FavoriteItems)
                .ThenInclude(x => x.Property)
                .FirstOrDefaultAsync(x => x.FavoriteId == Request.Cookies["favoriteId"]);
        }
    }
    
}