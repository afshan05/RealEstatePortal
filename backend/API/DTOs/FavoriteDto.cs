
namespace API.DTOs
{
    public class FavoriteDto
    {
        //public required string? FavoriteId { get; set; }
        public string UserId { get; set; }

        public List<FavoriteItemDto> FavoriteItems { get; set; } = [];
    }
    public class FavoriteItemDto
    {
        public int PropertyId { get; set; }
        public required string Title { get; set; }
        public long Price { get; set; }
        public required string ImageUrl { get; set; }
        public required string City { get; set; }
        public required string ListingType { get; set; }
        public int Bedrooms { get; set; }
        public int CarSpots { get; set; }

    }
}