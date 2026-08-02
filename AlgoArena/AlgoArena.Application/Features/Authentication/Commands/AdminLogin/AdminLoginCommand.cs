using AlgoArena.Application.Features.Authentication.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Authentication.Commands.AdminLogin
{
    public sealed class AdminLoginCommand : IRequest<AuthResponse>
    {
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}