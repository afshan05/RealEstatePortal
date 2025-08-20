using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class PropertyParams : PaginationParams
    {
    public string? OrderBy { get; set; }
    public string? SearchTerm { get; set; }
    public string? City { get; set; }
    public string? ListingType { get; set; }
    }
}