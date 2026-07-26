using Tasks_Project.Data;
using Tasks_Project.Models;

namespace Tasks_Project.Repositories
{
    public class UserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository (AppDbContext context)
        {
            _context = context;
        }

        public User GetByEmail (string email)
        {
            return _context.Users.FirstOrDefault(e => e.Email == email);
        }

        public User CreateUser (User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }
    }
}
