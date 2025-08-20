
using API.Entities;

namespace API.Extensions
{
    public static class PropertyExtensions
    {
        public static IQueryable<Property> Sort(this IQueryable<Property> query, string? orderBy)
    {
        query = orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Title)
        };

        return query;
    }

    public static IQueryable<Property> Search(this IQueryable<Property> query, string? searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return query;

        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(x => x.Title.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Property> Filter(this IQueryable<Property> query, 
        string? city, string? types) {
            var cityList = new List<string>();
            var typeList = new List<string>();

            if (!string.IsNullOrEmpty(city))
            {
                cityList.AddRange([.. city.ToLower().Split(",")]);
            }

            if (!string.IsNullOrEmpty(types))
            {
                typeList.AddRange([.. types.ToLower().Split(",")]);
            }

            query = query.Where(x => cityList.Count == 0 || cityList.Contains(x.City.ToLower()));
            query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.ListingType.ToLower()));

            return query;
        }
    }
}