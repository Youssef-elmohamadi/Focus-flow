using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tasks_Project.DTOs.AuthDto;
using Tasks_Project.Services;

namespace Tasks_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly UserService _service;

        public User (UserService service)
        {
            _service = service;
        }

        [HttpPost("/api/register")]

        public IActionResult CreateUser(RegisterDto data)
        {
            var result = _service.CreateUser(data);

            if (result == null) {
                return BadRequest(
                    new
                    {
                        message = "Email Already Exist"
                    }


                    );
            }

            return Ok( result );
        }

        [HttpPost("/api/login")]
        public IActionResult Login (LoginDto data)
        {
            var result = _service.GetUserByEmail(data);

            if (result == null)
            {
                return Unauthorized(

                    new
                    {
                        message = "Invalid password or email"
                    });
            }

            return Ok(result);
        }
    }
}
