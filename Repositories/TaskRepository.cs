using Tasks_Project.Controllers;
using Tasks_Project.Data;
using Tasks_Project.DTOs.Tasks;
using Tasks_Project.DTOs.TasksDto;
using Tasks_Project.Models;

namespace Tasks_Project.Repositories
{
    public class TaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public Tasks_Project.Models.Task AddTask(Tasks_Project.Models.Task data)
        {
            _context.Tasks.Add(data);
            _context.SaveChanges();
            return data;
        }

        public List<Tasks_Project.Models.Task> GetTasks(int userId)
        {
            var tasks= _context.Tasks.Where(x =>x.UserId == userId).ToList();
            return tasks;
        }

        public Tasks_Project.Models.Task GetById(int id,int userId)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId==userId);
            if (task == null) return null;
            return task;
        }

        public Tasks_Project.Models.Task UpdateTask(Tasks_Project.Models.Task data, int id,int userId)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId==userId);
            if (task == null) return null;
            task.Title = data.Title;
            task.Body = data.Body;
            task.IsExcuted = data.IsExcuted;
            task.UpdatedAt = data.UpdatedAt;
            _context.SaveChanges();
            return task;
        }

        public bool Delete (int id, int userId)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId == userId);
            if (task == null) return false;
            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return true;
        }

        public Tasks_Project.Models.Task ExecuteTask(int id, int userId)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId == userId);
            if (task == null) return null;
            
            task.IsExcuted = true;
            task.UpdatedAt = DateTime.Now;
            
            _context.SaveChanges();
            return task;
        }
    }
}
