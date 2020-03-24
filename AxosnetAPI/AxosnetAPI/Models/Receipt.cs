using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AxosnetAPI.Models
{
    public class Receipt
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdReceipt { get; set; }

        [Required]
        [StringLength(10,
            ErrorMessage = "The Provider Code cannot exceed more than 10 characters")]
        public string ProviderCode { get; set; }

        [Required]
        [Range(0, 9999999999999999.99,
            ErrorMessage = "The Amount cannot be negative")]
        [RegularExpression(@"^\d+\.\d{0,2}$",
            ErrorMessage = "The Amount cannot be more than two decimal places")]
        public decimal? Amount { get; set; }

        [Required]
        public DateTime? Date { get; set; }

        [StringLength(500, ErrorMessage = "The Comments cannot exceed more than 500 characters")]
        public string Comments { get; set; }

        //Relation to Currency
        [Required]
        [ForeignKey("Currency")]
        public int? IdCurrency { get; set; }
        public Currency Currency { get; set; }

        //Relation to User
        [ForeignKey("User")]
        public int? IdUser { get; set; }
        public User User { get; set; }
    }
}
