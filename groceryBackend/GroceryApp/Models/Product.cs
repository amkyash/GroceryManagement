using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryApp.Models
{
    public class Product
    {
        [Key]
        public int id {  get; set; }    
        public string productName { get; set; }    
        public string productDescription { get; set; }
        public int productPrice { get; set; }
        public string productImageLink { get; set; }
        public string productCategory { get; set; }
        public int productCount { get; set; }   
        public float productDiscount { get; set; } 
        public string productSpecification { get; set; }
       

    }
}
