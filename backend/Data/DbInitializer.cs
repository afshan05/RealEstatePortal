using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retrieve store context");
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
                ?? throw new InvalidOperationException("Failed to retrieve user manager");

            await SeedData(context, userManager);
        }

        private static async Task SeedData(StoreContext context, UserManager<User> userManager)
        {
            context.Database.Migrate();

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob@test.com",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin@test.com",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }
            if (context.Properties.Any()) return;
            var properties = new List<Property> {
                new() {
                    Title="House Property 1",
                    Address="20 Ward St Floral Park, New York NY 11001",
                    City="California",
                    Price=300,
                    ListingType="Rent",
                    Bedrooms=2,
                    Bathrooms=3,
                    CarSpots=1,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang1.png"

                },
                new() {
                    Title="House Property 2",
                    Address="20 Ward St Floral Park, New York NY 11001",
                    City="San Francisco",
                    Price=150000,
                    ListingType="Sale",
                    Bedrooms=4,
                    Bathrooms=3,
                    CarSpots=2,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang2.png"

                },
                new() {
                    Title="House Property 3",
                    Address="20 Ward St Floral Park, New York NY 11001",
                    City="California",
                    Price=680,
                    ListingType="Rent",
                    Bedrooms=3,
                    Bathrooms=3,
                    CarSpots=3,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang3.png"

                },
                new() {
                    Title="House Property 4",
                    Address="20 Ward St Floral Park, New York NY 11001",
                    City="California",
                    Price=550,
                    ListingType="Rent",
                    Bedrooms=2,
                    Bathrooms=3,
                    CarSpots=1,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang4.png"

                },
                new() {
                    Title="House Property 5",
                    Address="20 Ward St Floral Park, New York NY 11001",
                     City="California",
                    Price=1000,
                    ListingType="Rent",
                    Bedrooms=5,
                    Bathrooms=3,
                    CarSpots=3,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang5.png"

                },
                new() {
                    Title="House Property 6",
                    Address="20 Ward St Floral Park, New York NY 11001",
                    City="New Jersy",
                    Price=365,
                    ListingType="Rent",
                    Bedrooms=2,
                    Bathrooms=3,
                    CarSpots=1,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang6.png"

                },
                new() {
                    Title="House Property 7",
                    Address="20 Ward St Floral Park, New York NY 11001",
                    City="Virginia",
                    Price=85000,
                    ListingType="Sale",
                    Bedrooms=2,
                    Bathrooms=3,
                    CarSpots=1,
                    Description="Spacious and luxurious home with panoramic views",
                    ImageUrl="/images/properties/house-ang6.png"

                },

            };
            context.Properties.AddRange(properties);


            context.SaveChanges();
        }
    }
}