using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Property> Properties { get; set; }
        public required DbSet<Basket> Baskets { get; set; }
        public required DbSet<Favorite> Favorites { get; set; }
    }
}