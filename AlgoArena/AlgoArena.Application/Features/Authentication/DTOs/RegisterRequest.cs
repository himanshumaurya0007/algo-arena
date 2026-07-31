using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace AlgoArena.Application.Features.Authentication.DTOs
{
    public sealed record RegisterCommand : IRequest<AuthResponse>
    {
        public string Username { get; init; } = string.Empty;

        public string Email { get; init; } = string.Empty;

        public string Password { get; init; } = string.Empty;

        public string ConfirmPassword { get; init; } = string.Empty;
    }
}
