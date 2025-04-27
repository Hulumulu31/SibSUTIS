using Microsoft.EntityFrameworkCore;
using TableApp.Models;

namespace TableApp.Repositories
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Comment> Comments { get; set; }
    }
}
