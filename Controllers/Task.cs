using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tasks_Project.DTOs.Common;
using Tasks_Project.DTOs.Tasks;
using Tasks_Project.DTOs.TasksDto;
using Tasks_Project.Models;
using Tasks_Project.Services;

namespace Tasks_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Task : ControllerBase
    {
        private readonly TaskService _service;
        public Task (TaskService service)
        {
            _service = service;
        }
        [Authorize]
        [HttpPost]
        public IActionResult CreateTask(CreateDto data)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId == null)
                return Unauthorized();
            ResponseDto task = _service.AddTask(data,userId);

            return Ok(new ApiResponse<ResponseDto>
            {
                Success = true,
                Message = "Task created successfully",
                Data = task,
                Errors = ModelState
            });
        }
        [Authorize]
        [HttpGet]

        public IActionResult GetAllTasks()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId == null)
                return Unauthorized();
            var tasks = _service.GetAllTasks(userId);

            return Ok(new ApiResponse<List<ResponseDto>>
            {
                Success = true,
                Message = "Tasks retrieved successfully",
                Data = tasks,
                Errors = null
            });
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetTaskById(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId == null)
                return Unauthorized();
            ResponseDto task = _service.GetTaskById(id,userId);
            if (task == null) return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Task not found",
                Data = null,
                Errors = null
            });
            return Ok(new ApiResponse<ResponseDto>
            {
                Success = true,
                Message = "Task retrieved successfully",
                Data = task,
                Errors = null
            }); ;
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateTask (int id ,UpdateDto data)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId == null)
                return Unauthorized();
            ResponseDto task = _service.UpdateTask(data, id,userId);
            if (task == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Task not found",
                    Data = null,
                    Errors = null
                });
            }

            return Ok(new ApiResponse<ResponseDto>
            {
                Success = true,
                Message = "Task updated successfully",
                Data = task,
                Errors = null
            });
        }

        [Authorize]
        [HttpDelete("{id}")]

        public IActionResult DeleteTask (int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId == null)
                return Unauthorized();
            bool isDeleted = _service.Delete(id,userId);
            if (!isDeleted)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Task not found",
                    Data = null,
                    Errors = null
                });
            }

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Task deleted successfully",
                Data = null,
                Errors = null
            });
        }

        [Authorize]
        [HttpPatch("{id}/execute")]
        public IActionResult ExecuteTask(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId == null)
                return Unauthorized();
            
            ResponseDto task = _service.ExecuteTask(id, userId);
            
            if (task == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Task not found",
                    Data = null,
                    Errors = null
                });
            }

            return Ok(new ApiResponse<ResponseDto>
            {
                Success = true,
                Message = "Task marked as executed successfully",
                Data = task,
                Errors = null
            });
        }
    }
}
