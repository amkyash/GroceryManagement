using System.ComponentModel.DataAnnotations;

namespace GroceryApp.Models
{
    public class CartItem
    {
        [Key]
        public int cartItemId { get; set; }
        public int userCartId { get; set; }
        public int productId { get; set; }
    }
}
