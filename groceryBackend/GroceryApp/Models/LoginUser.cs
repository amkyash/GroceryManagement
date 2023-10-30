using System.ComponentModel.DataAnnotations;

namespace GroceryApp.Models
{
    public class LoginUser
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }    
    }
}
