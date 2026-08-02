using AlgoArena.Domain.Entities.Identity;

namespace AlgoArena.Domain.Interfaces.Security
{
    public interface IPasswordHasher
    {
        string HashPassword(User user, string password); 
        string HashPassword(string password);
        bool VerifyPassword(User user, string password, string passwordHash);
        bool VerifyPassword(string password, string passwordHash);
    }
}