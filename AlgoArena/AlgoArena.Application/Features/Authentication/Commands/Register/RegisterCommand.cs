using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlgoArena.Application.Features.Authentication.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Authentication.Commands.Register
{
    /// <summary>
    /// Command used to register a new user.
    /// </summary>
    public sealed record RegisterCommand : IRequest<AuthResponse>
    {
        /// <summary>
        /// Username chosen by the user.
        /// </summary>
        public string Username { get; init; } = string.Empty;

        /// <summary>
        /// User email address.
        /// </summary>
        public string Email { get; init; } = string.Empty;

        /// <summary>
        /// User password.
        /// </summary>
        public string Password { get; init; } = string.Empty;

        /// <summary>
        /// Password confirmation.
        /// </summary>
        public string ConfirmPassword { get; init; } = string.Empty;
    }
}