using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Property
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Address { get; set; }
        public required string City { get; set; }
        public long Price { get; set; }
        public required string ListingType { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarSpots { get; set; }
        public string Description { get; set; }
        public required string ImageUrl { get; set; }
    }
}