using AlgoArena.Application.Features.Authentication.DTOs;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Interfaces.Security;
using AlgoArena.Domain.Interfaces.UserRepositories;
using MediatR;

namespace AlgoArena.Application.Features.Authentication.Commands.Register
{
    public sealed class RegisterCommandHandler
        : IRequestHandler<RegisterCommand, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public RegisterCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }


        public async Task<AuthResponse> Handle(
            RegisterCommand request,
            CancellationToken cancellationToken)
        {
            // Password confirmation check
            if (request.Password != request.ConfirmPassword)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Password and confirm password do not match."
                };
            }


            // Check email exists
            var existingUser =
                await _userRepository.GetByEmailAsync(request.Email);


            if (existingUser != null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Email already exists."
                };
            }


            // Create new user
            var user = new User
            {
                Username = request.Username.Trim(),

                Email = request.Email.Trim().ToLower(),

                PasswordHash =
                    _passwordHasher.HashPassword(request.Password),

                // Must exist in AccountStatuses and Roles tables
                AccountStatusId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                RoleId = Guid.Parse("22222222-2222-2222-2222-222222222222")
            };


            // Save user
            await _userRepository.AddAsync(user);


            return new AuthResponse
            {
                Success = true,
                Message = "Registration completed successfully."
            };
        }
    }
}
