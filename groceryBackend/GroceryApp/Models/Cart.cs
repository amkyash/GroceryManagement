using System.ComponentModel.DataAnnotations;

namespace GroceryApp.Models
{
    public class Cart
    {
        [Key]
        public int cartId { get; set; }
        public string? userEmail { get; set; }
        public Boolean ordered { get; set; }    
        public DateTime orderDate { get; set; }

    }
}
