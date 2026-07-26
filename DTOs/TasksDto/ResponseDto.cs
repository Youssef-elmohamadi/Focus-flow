using Tasks_Project.Models;

namespace Tasks_Project.DTOs.Tasks
{
    public class ResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }

        public bool IsExcuted { get; set; } = false;

        public int UserId { get; set; }
    }
}
