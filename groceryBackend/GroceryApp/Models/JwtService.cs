using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GroceryApp.Models
{
    public class JwtService
    {
        private IConfiguration config;

        public string SecreteKey { get; set; }
        public int TokenDuration { get; set; }

        public JwtService(IConfiguration _config) 
        {
            config = _config;
            this.SecreteKey = config.GetSection("jwtConfig").GetSection("Key").Value;
            this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
        } 
        public string GenerateToken(string id,string firstname,string lastname,string email,string mobile,string gender)
        {
            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecreteKey));
            var signature=new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            //claims ->data abiut entity

            var payload = new[]
            {
                new Claim("id",id),
                new Claim("firstname",firstname),
                new Claim("lastname",lastname),
                new Claim("email",email),
                new Claim("mobile",mobile),
                new Claim("gender",gender)
            };

            var jwtToken = new JwtSecurityToken(
                issuer:"localhost",
                audience:"localhost",
                claims:payload,
                expires:DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials:signature
                );

           return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}
