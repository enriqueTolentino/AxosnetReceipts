using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AxosnetAPI.Models
{
    public class Currency
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdCurrency { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        // Relation to Receipts
        public ICollection<Receipt> Receipts { get; set; }
    }
}
