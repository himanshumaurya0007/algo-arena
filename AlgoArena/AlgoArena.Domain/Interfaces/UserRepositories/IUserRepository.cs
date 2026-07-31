using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlgoArena.Domain.Entities.Identity;


namespace AlgoArena.Domain.Interfaces.UserRepositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetByUsernameAsync(string username);

        Task<bool> ExistsByEmailAsync(string email);

        Task<bool> ExistsByUsernameAsync(string username);

        Task AddAsync(User user);

        Task UpdateAsync(User user);
    }
}
