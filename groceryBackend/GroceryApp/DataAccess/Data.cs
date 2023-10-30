using GroceryApp.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.DataAccess
{
    public class Data : IData
    {
        private AppDbContext _appDbContext;
        private List<Product> _productList;
        private List<Users> _userList;
        public Data(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            _productList = _appDbContext.Products.ToList();
            _userList = _appDbContext.Users.ToList();
        }

        public int GetUserList(EmailOnly e)
        {
            foreach(var user in _userList) {
                if (user.Email == e.Email)
                    return user.Id;
            }
            return 1;
        }
        public List<Product> GetProductList()
        {
            return _productList;
        }

        public Product SpecificProduct(int id)
        {
            foreach(var product in _productList)
            {
                if(product.id == id)
                    return product;
            }
            return null;
        }
        public List<Product> CategorisedProduct(string category)
        {
            List<Product> products = new List<Product>();
            foreach(var product in _productList) { 
                if(product.productCategory==category)
                {
                    products.Add(product);
                }
                //_productList.FindAll(element => element.productCategory.Equals(category));
            }
            return products;
        }

        public List<Product> ProductName(string category)
        {
            List<Product> products = new List<Product>();
            foreach (var product in _productList)
            {
                if (product.productCategory.ToLower() == category.ToLower() || product.productName.ToLower()==category.ToLower())
                {
                    products.Add(product);
                }
            }
            return products;
        }

        public Boolean InsertData(Users user)
        {
            if(_appDbContext.Users.Where(u=>u.Email==user.Email).FirstOrDefault()!=null)
            {
                return false;
            }
            user.MemberSince = DateTime.Now;
            _appDbContext.Users.Add(user);
            _appDbContext.SaveChanges();
            return true;
        }
        public Boolean EditProduct(Product product)
        {
            Product temp;
            temp = _appDbContext.Products.Where(d => d.id == product.id).First();
            temp.productName = product.productName;
            temp.productCategory = product.productCategory; 
            temp.productDescription = product.productDescription;
            temp.productPrice = product.productPrice;
            temp.productImageLink=product.productImageLink;
            temp.productDiscount = product.productDiscount;
            temp.productCount = product.productCount;
            if(product.productSpecification!=null)
                temp.productSpecification = product.productSpecification;

            _appDbContext.Entry(temp).State=EntityState.Modified;
            _appDbContext.SaveChanges();
            return true;
        }
        public Boolean addProduct(Product product)
        {
           _appDbContext.Products.Add(product);
            _appDbContext.SaveChanges();
            return true;
        }

        public Boolean deleteProduct(int id)
        {
            Product element=_appDbContext.Products.Where(u=>u.id==id).FirstOrDefault();
            if(element!=null)
            {
                _appDbContext.Remove(element);
                _appDbContext.SaveChanges(); 
                return true;
            }
            else 
            { return false; }
           
        }
        /*  ##############################################CartTaskStartHere###########################*/
        public int checkCart(RecieveCartItem value)
        {
            var cartData = _appDbContext.UserCart.ToList();
            int count = cartData.Count;
            Console.WriteLine("Count="+count);
            int cartIden = 0;
            if (count > 0)
            {
                Console.WriteLine("in the if block >0");
                foreach (var item in cartData)
                {
                    if (value.email == item.userEmail && item.ordered == false)
                    {
                        cartIden = item.cartId;
                        Console.WriteLine("CartIden set there in for ready to break");
                        break;
                    }
                }
                //creted new cart id for new user
                if (cartIden == 0)
                {
                    Console.WriteLine("CartIden found 0 after loop");
                    Cart temp = new Cart();
                    temp.userEmail = value.email;
                    temp.ordered = false;
                    temp.orderDate = DateTime.Now;
                    _appDbContext.UserCart.Add(temp);
                    _appDbContext.SaveChanges();
                    cartIden = count + 1;
                }
            }
            else
            {
                Console.WriteLine("In else block");
                Cart temp = new Cart();
                temp.userEmail = value.email;
                temp.ordered = false;
                temp.orderDate = DateTime.Now;
                Console.WriteLine("Going to add data");
                _appDbContext.UserCart.Add(temp);
                _appDbContext.SaveChanges();
                cartIden = 1;
            }
            Console.WriteLine(cartIden);
            CartItem cartItemVar = new CartItem();
            cartItemVar.userCartId = cartIden;
            cartItemVar.productId = value.prodId;

            Console.WriteLine(cartItemVar);

            _appDbContext.UsercartItems.Add(cartItemVar);
            _appDbContext.SaveChanges();
            Console.WriteLine("Exit");
            return cartIden;

        }
/*##################################### DataFromCart ##################################################################*/
        public List<Product> dataFromCart(int idd)
        {
            var em = "";
            var userList = _appDbContext.Users.ToList();
            foreach(var user in userList)
            {
                if(user.Id==idd)
                {
                    em=user.Email; 
                    break;  
                }
            }

            var cartData = _appDbContext.UserCart.ToList();
            int count = cartData.Count;
            Console.WriteLine("Count=" + count);
            int cartIden = 0;
            if (count > 0)
            {
                Console.WriteLine("in the if block >0");
                foreach (var item in cartData)
                {
                    if (em == item.userEmail && item.ordered == false)
                    {
                        cartIden = item.cartId;
                        Console.WriteLine("CartIden set there in for ready to break");
                        break;
                    }
                }
                //creted new cart id for new user
                if (cartIden == 0)
                {
                    Console.WriteLine("CartIden found 0 after loop");
                    Cart temp = new Cart();
                    temp.userEmail = em;
                    temp.ordered = false;
                    temp.orderDate = DateTime.Now;
                    _appDbContext.UserCart.Add(temp);
                    _appDbContext.SaveChanges();
                    cartIden = count + 1;
                }
            }
            else
            {
                Console.WriteLine("In else block");
                Cart temp = new Cart();
                temp.userEmail = em;
                temp.ordered = false;
                temp.orderDate = DateTime.Now;
                Console.WriteLine("Going to add data");
                _appDbContext.UserCart.Add(temp);
                _appDbContext.SaveChanges();
                cartIden = 1;
            }

            var cartItemData = _appDbContext.UsercartItems.ToList();
            var productList=_appDbContext.Products.ToList();
            List<Product> output= new List<Product>();
            List<int> cartProdId = new List<int>();

            foreach(var i in cartItemData)
            {
                if(i.userCartId== cartIden)
                {
                    cartProdId.Add(i.productId);
                }
            }
            foreach (var j in cartProdId)
            {
                foreach(var k in productList) {
                    if(k.id==j)
                    {
                        output.Add(k);
                        break;
                    }
                }
            }
            return output;
        }
        /*##################################### AfterPlaceOrder ##################################################################*/
        
        public Boolean editCart(Cart cart)
        {
            Cart temp;
            temp = _appDbContext.UserCart.Where(u => u.cartId == cart.cartId).First();
            temp.userEmail = cart.userEmail;
            temp.ordered = true;
            temp.orderDate = DateTime.Now;

            _appDbContext.Entry(temp).State = EntityState.Modified;
            _appDbContext.SaveChanges();
            return true;
        }
        public Boolean placedOrder(int idd)
        {
            var em = "";
            var userList = _appDbContext.Users.ToList();
            var cartData = _appDbContext.UserCart.ToList();
            var cartItemData=_appDbContext.UsercartItems.ToList();
            var productList=_appDbContext.Products.ToList();
            Cart temp=new Cart();

            foreach (var user in userList)
            {
                if (user.Id == idd)
                {
                    em = user.Email;
                    break;
                }
            }
            foreach (var item in cartData)
            {
                if (em == item.userEmail && item.ordered == false)
                {
                    temp=item;
                    Console.WriteLine("CartIden set there in for ready to break");
                    break;
                }
            }

            foreach(var item in cartItemData)
            {
                if(item.userCartId == temp.cartId)
                {
                    foreach(var i in productList)
                    {
                        if(i.id==item.productId)
                        {
                            i.productCount -= 1;
                            EditProduct(i);
                            break;
                        }
                    }
                }
            }
            if(editCart(temp))
                return true;
            return false;
        }

        public List<Product> myOrder(int id)
        {
            var em = "";
            var userList = _appDbContext.Users.ToList();
            var cartData = _appDbContext.UserCart.ToList();
            var cartItemData = _appDbContext.UsercartItems.ToList();
            var productList = _appDbContext.Products.ToList();
            Cart temp = new Cart();
            List<Product>MyOrder= new List<Product>();
            List<int> orderCartId = new List<int>();  
            foreach (var user in userList)
            {
                if (user.Id == id)
                {
                    em = user.Email;
                    break;
                }
            }
            foreach (var item in cartData)
            {
                if (em == item.userEmail && item.ordered == true)
                {
                    orderCartId.Add(item.cartId);
                }
            }
            foreach(var item in orderCartId)
            {
                foreach(var item2 in cartItemData)
                {
                   if(item==item2.userCartId)
                    {
                      foreach(var item3 in productList)
                        {
                            if(item2.productId==item3.id)
                            {
                                MyOrder.Add(item3);
                            }
                        }
                    }
                }
            }
            return MyOrder;
        }
/*#############################################################*/
        public Boolean RemoveItemFromCart(RemoveItem product)
        {
            var cartData = _appDbContext.UserCart.ToList();
            var cartItemData = _appDbContext.UsercartItems.ToList();
            var _cartId=0;

            foreach(var item in cartData)
            {
                if (product.Email == item.userEmail && item.ordered == false)
                {
                    _cartId = item.cartId;
                    break;
                }
            }
            foreach(var item in cartItemData)
            {
                if(item.userCartId==_cartId)
                {
                    CartItem cartItem = _appDbContext.UsercartItems.Where(u=>u.userCartId== _cartId).FirstOrDefault();
                    _appDbContext.UsercartItems.Remove(cartItem);   
                     _appDbContext.SaveChanges();
                    break;
                }
            }
            return true;

        }

        /*################################################## Add Review ###############################*/

        public Boolean AddReview(Review review)
        {
            _appDbContext.Reviews.Add(review);  
            _appDbContext.SaveChanges();    
            return true;    
        }
        public List<string> GetReview(int prodId) {
            var reviewList=_appDbContext.Reviews.ToList();
            List<string> reviews = new List<string>();    
            foreach(var i in reviewList)
            {
                 if(i.ProductId==prodId)
                {
                    reviews.Add(i.ReviewContent);
                }
            }
            return reviews;
        }


    }
}
