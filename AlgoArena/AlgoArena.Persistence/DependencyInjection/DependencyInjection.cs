using AlgoArena.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            services.AddDbContext<AlgoArenaDbContext>(options =>
            {
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"));
            });

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