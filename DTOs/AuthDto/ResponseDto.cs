namespace Tasks_Project.DTOs.AuthDto
{
    public class ResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Token { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
