namespace GroceryApp.Models
{
    public class EditProduct
    {
        public int id { get; set; }
        public string productName { get; set; }
        public string productDescription { get; set; }
        public string productCategory { get; set; } 
        public int productCount { get; set; } 
        public string productImageLink { get; set; }
        public float productPrice { get; set; }
        public float discount { get; set; } 
        public string specification { get; set; }
       
       
       
    }
}
