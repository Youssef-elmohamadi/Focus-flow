using Tasks_Project.DTOs.Tasks;
using Tasks_Project.DTOs.TasksDto;
using Tasks_Project.Repositories;

namespace Tasks_Project.Services
{
    public class TaskService
    {

        private readonly TaskRepository _repository;

        public TaskService(TaskRepository repository)
        {
            _repository = repository;
        }

        public ResponseDto AddTask(CreateDto data, int userId)
        {
            var task = new Tasks_Project.Models.Task
            {
                UserId = userId,
                Title = data.Title,
                Body = data.Body,
                IsExcuted = data.IsExcuted,

            };
            var sk = _repository.AddTask(task);

            return new ResponseDto
            {
                Id = sk.Id,
                Title = sk.Title,
                Body = sk.Body,
                IsExcuted = sk.IsExcuted,
                UserId = sk.UserId,
                CreatedAt = DateTime.Now,
            };
        }

        public List<ResponseDto> GetAllTasks(int userId)
        {
            List<Tasks_Project.Models.Task> tasks = _repository.GetTasks(userId);

            List<ResponseDto> result = new List<ResponseDto>();

            foreach (var task in tasks)
            {
                result.Add(new ResponseDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    Body = task.Body,
                    IsExcuted = task.IsExcuted,
                    CreatedAt = task.CreatedAt,
                    UserId = task.UserId
                });

            }
            return result;
        }

        public ResponseDto GetTaskById(int id,int userId)
        {
            var task = _repository.GetById(id,userId);
            if (task == null) return null;
            return new ResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Body = task.Body,
                IsExcuted = task.IsExcuted,
                CreatedAt = task.CreatedAt,
                UserId = task.UserId
            };
        }

        public ResponseDto UpdateTask(UpdateDto data, int id,int userId)
        {
            var task = new Tasks_Project.Models.Task
            {
                Title = data.Title,
                Body = data.Body,
                IsExcuted = data.IsExcuted,
                UpdatedAt = DateTime.Now
            };
            var updatedTask = _repository.UpdateTask(task, id,userId);
            if (updatedTask == null) return null;
            return new ResponseDto
            {
                Id = updatedTask.Id,
                Title = updatedTask.Title,
                Body = updatedTask.Body,
                IsExcuted = updatedTask.IsExcuted,
                CreatedAt = updatedTask.CreatedAt,
                UserId = updatedTask.UserId
            };
        }
        public bool Delete(int id,int userId)
        {
            return _repository.Delete(id,userId);
        }

        public ResponseDto ExecuteTask(int id, int userId)
        {
            var updatedTask = _repository.ExecuteTask(id, userId);
            if (updatedTask == null) return null;
            return new ResponseDto
            {
                Id = updatedTask.Id,
                Title = updatedTask.Title,
                Body = updatedTask.Body,
                IsExcuted = updatedTask.IsExcuted,
                CreatedAt = updatedTask.CreatedAt,
                UserId = updatedTask.UserId
            };
        }
    }

}
