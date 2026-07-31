using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlgoArena.Application.Features.Authentication.DTOs
{
    public sealed class AuthResponse
    {
        public bool Success { get; set; }

        public string Message { get; set; } = string.Empty;

        public string? Token { get; set; }

        public DateTime? ExpiresAt { get; set; }
    }
}