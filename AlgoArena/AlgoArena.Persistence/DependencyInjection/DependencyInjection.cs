using AlgoArena.Domain.Interfaces.UserRepositories;
using AlgoArena.Persistence.Data;
using AlgoArena.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AlgoArena.Application.Features.Lookups.Interfaces;
using AlgoArena.Persistence.Repositories.Lookups;

namespace AlgoArena.Persistence.DependencyInjection
{
    /// <summary>
    /// Registers all persistence services.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            // Database
            services.AddDbContext<AlgoArenaDbContext>(options =>
            {
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"));
            });

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ILookupRepository, LookupRepository>();

            // Feature registrations
            services.AddProblemsPersistence();

            // Future features
            // services.AddIdentityPersistence();
            // services.AddProfilesPersistence();
            // services.AddLookupsPersistence();
            // services.AddAnalyticsPersistence();
            // services.AddSubmissionsPersistence();

            return services;
        }
    }
}