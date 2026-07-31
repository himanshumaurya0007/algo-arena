namespace AlgoArena.Application.Features.Authentication.DTOs
{
    public sealed class LoginResponse
    {
        public bool Success { get; set; }

        public string Message { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;

        public DateTime? ExpiresAt { get; set; }
    }
}