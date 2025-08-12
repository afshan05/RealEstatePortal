using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class FavoriteExtensions
    {
        public static FavoriteDto ToDto(this Favorite favorite)
    {
        return new FavoriteDto
        {
            FavoriteId = favorite.FavoriteId,
            FavoriteItems = favorite.FavoriteItems.Select(x => new FavoriteItemDto
            {
                PropertyId = x.PropertyId,
                Title = x.Property.Title,
                Price = x.Property.Price,
                City = x.Property.City,
                ListingType = x.Property.ListingType,
                ImageUrl = x.Property.ImageUrl,
                Bedrooms = x.Property.Bedrooms
            }).ToList()
        };
    }
    }
}