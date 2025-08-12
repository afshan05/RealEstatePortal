using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Favorite
    {
        public int Id { get; set; }
        public required string FavoriteId { get; set; }
        public List<FavoriteItem> FavoriteItems { get; set; } = [];


        public void AddItem(Property property)
        {
            if (property == null) ArgumentNullException.ThrowIfNull(property);


            var existingItem = FindItem(property.Id);

            if (existingItem == null)
            {
                FavoriteItems.Add(new FavoriteItem
                {
                    Property = property
                });
            }

        }

        public void RemoveItem(int propertyId)
        {
            
            var item = FindItem(propertyId);
            if (item == null) return;

           
           FavoriteItems.Remove(item);
        }

        private FavoriteItem? FindItem(int propertyId)
        {
            return FavoriteItems.FirstOrDefault(item => item.PropertyId == propertyId);
        }
        
    }
}