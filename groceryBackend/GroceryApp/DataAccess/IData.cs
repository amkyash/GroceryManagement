using GroceryApp.Models;

namespace GroceryApp.DataAccess
{
    public interface IData
    {
        List<Product> GetProductList();
        Product SpecificProduct(int id);
        List<Product> CategorisedProduct(string category);
        List<Product> ProductName(string name);
        Boolean InsertData(Users user);
        Boolean EditProduct(Product product);
        Boolean addProduct(Product product);
        Boolean deleteProduct(int id);
        int checkCart(RecieveCartItem value);
        List<Product> dataFromCart(int idd);
         Boolean placedOrder(int idd);
        List<Product> myOrder(int id);
        Boolean RemoveItemFromCart(RemoveItem product);
        Boolean AddReview(Review review);
        List<string> GetReview(int prodId);
        int GetUserList(EmailOnly e);

       /* Boolean CheckData(UserLogin user);*/
    }
}