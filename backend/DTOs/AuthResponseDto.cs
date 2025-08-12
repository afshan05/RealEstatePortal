namespace API.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime TokenExpiry { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
    }
}
