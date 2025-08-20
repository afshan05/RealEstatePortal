using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FavoriteController : BaseApiController
    {
        private readonly StoreContext _context;

        public FavoriteController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<FavoriteDto>> GetFavorites()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var favorite = await _context.Favorites
                    .Include(f => f.FavoriteItems)
                    .ThenInclude(fi => fi.Property)
                    .FirstOrDefaultAsync(f => f.UserId == userId);

                if (favorite == null)
                    return Ok(new FavoriteDto { UserId = userId });

                return Ok(favorite.ToDto());
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetFavorites: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<FavoriteDto>> AddFavorite(int propertyId)
        {
            var favorite = await RetrieveFavorite(GetUserId());
            favorite ??= await CreateFavorite();

            var property = await _context.Properties.FindAsync(propertyId);
            if (property == null) return BadRequest("Property not found");

            favorite.AddItem(property);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetFavorites), MapFavoriteToDto(favorite));

            return BadRequest("Problem adding to favorites");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveFavorite(int propertyId)
        {
            var favorite = await RetrieveFavorite(GetUserId());
            if (favorite == null) return BadRequest("Unable to retrieve favorites");

            favorite.RemoveItem(propertyId);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest("Problem removing from favorites");
        }

        private string? GetUserId()
        {
            return User.Identity?.IsAuthenticated == true
                ? User.FindFirstValue(ClaimTypes.NameIdentifier)
                : null;
        }

        private async Task<Favorite> CreateFavorite()
        {
            var userId = GetUserId();
            Favorite favorite;

          
                var favoriteId = Guid.NewGuid().ToString();
                favorite = new Favorite { UserId = userId};
            

            _context.Favorites.Add(favorite);
            return favorite;
        }

        private async Task<Favorite?> RetrieveFavorite(string? userId)
        {
            
                return await _context.Favorites
                    .Include(x => x.FavoriteItems)
                    .ThenInclude(x => x.Property)
                    .FirstOrDefaultAsync(x => x.UserId == userId);            
          
        }

        private FavoriteDto MapFavoriteToDto(Favorite favorite)
        {
            return new FavoriteDto
            {
                //FavoriteId = favorite.FavoriteId,
                UserId = favorite.UserId,
                FavoriteItems = favorite.FavoriteItems.Select(fi => new FavoriteItemDto
                {
                    PropertyId = fi.PropertyId,
                    Title = fi.Property?.Title ?? string.Empty,
                    Price = fi.Property?.Price ?? 0,
                    ImageUrl = fi.Property?.ImageUrl ?? string.Empty,
                    City = fi.Property?.City ?? string.Empty,
                    ListingType = fi.Property?.ListingType ?? string.Empty,
                    Bedrooms = fi.Property?.Bedrooms ?? 0
                }).ToList()
            };
        }

        [Authorize]
        [HttpPost("transfer")]
        public async Task<ActionResult> TransferFavorites()
        {
            var cookieFavorites = await RetrieveFavorite(null); // Get anonymous favorites
            if (cookieFavorites == null) return Ok(); // No favorites to transfer

            var userId = GetUserId();
            var userFavorites = await RetrieveFavorite(userId);

            if (userFavorites == null)
            {
                userFavorites = new Favorite { UserId = userId, };
                _context.Favorites.Add(userFavorites);
            }

            // Add all items from cookie favorites to user favorites
            foreach (var item in cookieFavorites.FavoriteItems)
            {
                if (item.Property != null && !userFavorites.FavoriteItems.Any(fi => fi.PropertyId == item.PropertyId))
                {
                    userFavorites.AddItem(item.Property);
                }
            }

            // Remove cookie favorites
            _context.Favorites.Remove(cookieFavorites);
            Response.Cookies.Delete("favoriteId");

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}