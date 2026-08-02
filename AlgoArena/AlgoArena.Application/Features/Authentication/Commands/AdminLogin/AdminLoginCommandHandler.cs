using AlgoArena.Application.Features.Authentication.DTOs;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Interfaces.Security;
using AlgoArena.Domain.Interfaces.UserRepositories;
using MediatR;

namespace AlgoArena.Application.Features.Authentication.Commands.AdminLogin
{
    public sealed class AdminLoginCommandHandler
        : IRequestHandler<AdminLoginCommand, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;


        public AdminLoginCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtTokenGenerator = jwtTokenGenerator;
        }


        public async Task<AuthResponse> Handle(
            AdminLoginCommand request,
            CancellationToken cancellationToken)
        {
            // 1. Find admin by email
            User? admin = await _userRepository
                .GetByEmailAsync(request.Email);

            if (admin == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // 2. Check role
            if (admin.Role == null ||
                !string.Equals(
                    admin.Role.Name,
                    "Admin",
                    StringComparison.OrdinalIgnoreCase))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Only admin can login."
                };
            }

            // 3. Verify password (Plain text - Testing only)
            bool isPasswordValid = request.Password == admin.PasswordHash;

            if (!isPasswordValid)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // 4. Generate JWT token
            string token =
                _jwtTokenGenerator.GenerateToken(admin);

            // 5. Return response
            return new AuthResponse
            {
                Success = true,
                Message = "Admin login successful.",
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };
        }
    }
}