using System;
using System.ComponentModel.DataAnnotations;

namespace AxosnetAPI.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
