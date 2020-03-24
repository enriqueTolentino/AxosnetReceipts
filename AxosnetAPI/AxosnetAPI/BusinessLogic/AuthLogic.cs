using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using AxosnetAPI.Models;
using AxosnetAPI.Models.ViewModels;
using System.Security.Cryptography;
using System.IO;

namespace AxosnetAPI.BusinessLogic
{
    public class AuthLogic
    {
        private readonly IConfigurationRoot _configuration;
        private AxosnetAPIContext db;

        private readonly string EncryptionKey = "MAKV2SPBNI99212";

        public AuthLogic()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
        }

        public User loginValidate(LoginViewModel login)
        {
            try
            {
                using(db = new AxosnetAPIContext())
                {
                    User user = db.Users.FirstOrDefault(u => u.Email == login.email);

                    if (user != null)
                    {
                        if (Decrypt(user.Password) == login.password)
                        {
                            return user;
                        }
                    }
                }

                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string generarTokenSession(User user)
        {
            try
            {
                // Readd secret_key in appsettings
                var secretKey = _configuration.GetValue<string>("SecretKey");
                var key = Encoding.ASCII.GetBytes(secretKey);

                // Create claims of user

                var claims = new ClaimsIdentity();
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.IdUser.ToString()));
                claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    // Token Duration 1 hour
                    Expires = DateTime.UtcNow.AddHours(1),
                    //  hash 256
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var createdToken = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(createdToken);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public UserViewModel GeUserSession(string token)
        {
            try
            {
                token = token.Substring(7); // BEARER
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                JwtSecurityToken jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                string idUserString = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "nameid").Value;
                int idUser = 0;
                bool validId = int.TryParse(idUserString, out idUser);


                if (validId)
                {
                    using(db = new AxosnetAPIContext())
                    {
                        User userSession = db.Users.FirstOrDefault(u => u.IdUser == idUser);
                    return (userSession != null) ? ConvertUser(userSession) : throw new Exception("Sign in please");
                    }                    
                }

                throw new Exception("Sign in please");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User GetUserByToken(string token)
        {
            try
            {
                token = token.Substring(7); // BEARER
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                JwtSecurityToken jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                string idUserString = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "nameid").Value;
                int idUser = 0;
                bool validId = int.TryParse(idUserString, out idUser);


                if (validId)
                {
                    using(db = new AxosnetAPIContext())
                    {
                        return db.Users.FirstOrDefault(u => u.IdUser == idUser);
                    }
                }

                throw new Exception("Sign in please");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private UserViewModel ConvertUser(User user)
        {
            return new UserViewModel
            {
                email = user.Email
            };
        }

        // return true if not exists in database
        public bool validateUserNotExists(string Email)
        {
            try
            {
                using (db = new AxosnetAPIContext())
                {
                    User user = db.Users.FirstOrDefault(u => u.Email == Email);
                    return (user == null);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public string Encrypt(string clearText)
        {
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        private string Decrypt(string cipherText)
        {
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}
