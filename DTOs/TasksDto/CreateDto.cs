using System.ComponentModel.DataAnnotations;

namespace Tasks_Project.DTOs.TasksDto
{
    public class CreateDto
    {
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

        public bool IsExcuted { get; set; } = false;
    }
}