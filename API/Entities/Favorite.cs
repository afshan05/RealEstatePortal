using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Favorite
    {
        public int Id { get; set; }
        // navigation properties

        public int PropertyId { get; set; }
        public required Property Property { get; set; }

         public void AddFavorite(Property property)
        {
            if (property == null) ArgumentNullException.ThrowIfNull(property);
           
           
                Property = property;            
           
        }

       

        
    }
}