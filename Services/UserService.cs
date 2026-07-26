using Tasks_Project.DTOs.AuthDto;
using Tasks_Project.Models;
using Tasks_Project.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Tasks_Project.Services
{
    public class UserService
    {
        private readonly UserRepository _repository;
        private readonly IConfiguration _configuration;

        public UserService(UserRepository repository,IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public ResponseDto CreateUser (RegisterDto data)
        {
            var existingUser = _repository.GetByEmail(data.Email);
            if (existingUser != null)
            {
                return null;
            }

            User user = new User
            {
                Name = data.Name,
                Email = data.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(data.Password)

            };

            _repository.CreateUser(user);

            return new ResponseDto
            {
                Id = user.Id,
                Name = data.Name,
                Email = data.Email,
                Password=user.PasswordHash,
                CreatedAt = user.CreatedAt
            };
        }

        public ResponseDto GetUserByEmail(LoginDto dto)
        {

       
            var user = _repository.GetByEmail(dto.Email);

            if (user == null)
            {
                return null;
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password,user.PasswordHash);

            if (!isPasswordValid)
            {
                return null;
            }

            var token = GenerateToken(user);
            return new ResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.PasswordHash,
                Token = token
            };
        }

        private string GenerateToken(User user)
        {
            var claims = new Claim[]
            {
                new Claim (ClaimTypes.NameIdentifier ,user.Id.ToString()),
                new Claim (ClaimTypes.Name ,user.Name),
                new Claim (ClaimTypes.Email,user.Email)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                    )

                );
            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
                );

            var token = new JwtSecurityToken (
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims : claims,
                expires : DateTime.UtcNow.AddHours(1),
                signingCredentials : credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
