using System.ComponentModel.DataAnnotations;

namespace Tasks_Project.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(
            100,
            MinimumLength = 3,
            ErrorMessage = "Title must be between 3 and 100 characters"
        )]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Body is required")]
        [StringLength(
            1000,
            MinimumLength = 5,
            ErrorMessage = "Body must be between 5 and 1000 characters"
        )]
        public string Body { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public bool IsExcuted { get; set; } = false;

        public int UserId { get; set; }

        public User User { get; set; } = null!;
    }
}