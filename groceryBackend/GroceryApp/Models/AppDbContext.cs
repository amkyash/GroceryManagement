using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<LoginUser> LoginUsers { get; set; }
        public DbSet<Cart> UserCart { get; set; }   
        public DbSet<CartItem> UsercartItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }

}
