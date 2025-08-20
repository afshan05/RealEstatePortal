using System.ComponentModel.DataAnnotations.Schema;


namespace API.Entities
{

    [Table("FavoriteItems")]
    public class FavoriteItem
    {
        public int Id { get; set; }


        //navigation peroperties

        public int PropertyId { get; set; }
        public required Property Property { get; set; }

        public int FavoriteId { get; set; }
        public Favorite Favorite { get; set; } = null!;
       
    }
    
}