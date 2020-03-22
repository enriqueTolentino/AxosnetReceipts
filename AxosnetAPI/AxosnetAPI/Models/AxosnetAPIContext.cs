using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AxosnetAPI.Models
{
    public class AxosnetAPIContext : DbContext
    {
        public AxosnetAPIContext() { }

        public AxosnetAPIContext(DbContextOptions<AxosnetAPIContext> options)
        : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Currency> Currencies { get; set; }
    }
}
