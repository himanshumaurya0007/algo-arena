using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Interfaces.Security;
using Microsoft.AspNetCore.Identity;

namespace AlgoArena.Infrastructure.Security
{
    public sealed class PasswordHasher : IPasswordHasher
    {
        private readonly Microsoft.AspNetCore.Identity.PasswordHasher<User> _passwordHasher;

        public PasswordHasher()
        {
            _passwordHasher = new Microsoft.AspNetCore.Identity.PasswordHasher<User>();
        }

        public string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(new User(), password);
        }

        public bool VerifyPassword(User user, string password, string passwordHash)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, passwordHash, password);

            return result == PasswordVerificationResult.Success
                || result == PasswordVerificationResult.SuccessRehashNeeded;
        }
    }
}