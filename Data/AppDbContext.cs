using Microsoft.EntityFrameworkCore;
using Tasks_Project.Models;
namespace Tasks_Project.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Tasks_Project.Models.Task> Tasks { get; set; }
    }
}
