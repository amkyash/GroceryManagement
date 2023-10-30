using GroceryApp.DataAccess;
using GroceryApp.Models;
using GroceryStoreBackend.Services.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private IData _data;
        private IFileService _fileService;
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        public ShoppingController(IData data, IConfiguration config, AppDbContext context, IFileService fileservice) {
            _data = data;
            _config = config;
            _context = context;
            _fileService = fileservice;
        }
        [HttpGet("GetList")]
        public IActionResult AllProducts() {
            var result = _data.GetProductList();
            return Ok(result);
        }

        [HttpGet("ProductDetail")]
        public IActionResult ProductDetails(int id)
        {
            var result = _data.SpecificProduct(id);
            return Ok(result);
        }

        [HttpGet("productCategory")]

        public IActionResult ProductCategorised(string category)
        {
            var result = _data.CategorisedProduct(category);
            return Ok(result);
        }

        [HttpGet("ProductbyName")]
        public IActionResult ProductByName(string name)
        {
            var result = _data.ProductName(name);
            return Ok(result);
        }


        // User Creation in database
        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public IActionResult Create(Users user)
        {
            Boolean result;
            result = _data.InsertData(user);

            if (result)
                return Ok("User Registered");

            else
                return Ok("Already Exists");
        }

        [AllowAnonymous]
        [HttpPost("LoginU")]
        public IActionResult Login(UserLogin user)
        {
            var UserAvailable = _context.Users.Where(u => u.Email == user.Email && u.Pwd == user.Pwd).FirstOrDefault();
            if (UserAvailable != null)
                return Ok(new JwtService(_config).GenerateToken(
                    UserAvailable.Id.ToString(),
                    UserAvailable.FirstName,
                    UserAvailable.LastName,
                    UserAvailable.Email,
                    UserAvailable.Mobile,
                    UserAvailable.Gender
                    ));
            else
                return Ok("Failure");

        }

        [HttpPost("editProduct")]
        public IActionResult EditProduct(Product product)
        {
            Console.WriteLine(product);
            var result = _data.EditProduct(product);
            if (result)
                return Ok("All Ok");
            return Ok("check please");
        }

        [HttpPost("addProduct")]
        public IActionResult AddProduct(Product product)
        {
            var result = _data.addProduct(product);
            if (result)
                return Ok("DataAdded");
            else
                return Ok("CheckOnce");
        }

        [HttpPost("deleteProduct")]
        public IActionResult DeleteProduct(idOnly IdOnly)
        {
            var result = _data.deleteProduct(IdOnly.id);
            if (result)
                return Ok("product deleted");
            else
                return Ok("product not exist");
        }
        [HttpPost("cartSet")]
        public IActionResult CartTask(RecieveCartItem values)
        {
            var result = _data.checkCart(values);
            return Ok("Ok");
        }

        [HttpGet("cartGet")]
        public IActionResult GetCartProduct(int uIdd)
        {
            var result = _data.dataFromCart(uIdd);
            return Ok(result);
        }

        [HttpGet("placeOrder")]
        public IActionResult PlaceOrder(int id)
        {
            var result = _data.placedOrder(id);
            return Ok(result);
        }
        [HttpGet("myOrder")]
        public IActionResult UserOrders(int id)
        {
            var result = _data.myOrder(id);
            return Ok(result);
        }

        [HttpPost("removeCartItem")]
        public IActionResult RemoveItemFromCart(RemoveItem element)
        {
            var result = _data.RemoveItemFromCart(element);
            if (result)
                return Ok("Product Removed");
            else
                return Ok("Check Once");
        }

        [HttpPost("setReview")]
        public IActionResult SetReview(Review review)
        {
            var result=_data.AddReview(review);
            return Ok(result);
        }

        [HttpGet("GetReview")]
        public IActionResult GetReview(int id)
        {
            var resutl=_data.GetReview(id);
            return Ok(resutl); 
        }

        [HttpPost("userList")]
        public  IActionResult UserInfo(EmailOnly e)
        {
            return Ok(_data.GetUserList(e));
        }


    }

        
    }