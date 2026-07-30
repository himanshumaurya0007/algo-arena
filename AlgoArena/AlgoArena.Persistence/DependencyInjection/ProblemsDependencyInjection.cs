using AlgoArena.Application.Features.Problems.Interfaces;
using AlgoArena.Persistence.Repositories.Problems;
using Microsoft.Extensions.DependencyInjection;

namespace AlgoArena.Persistence.DependencyInjection
{
    /// <summary>
    /// Registers persistence services related to the Problems feature.
    /// </summary>
    internal static class ProblemsDependencyInjection
    {
        internal static IServiceCollection AddProblemsPersistence(
            this IServiceCollection services)
        {
            services.AddScoped<IProblemRepository, ProblemRepository>();

            return services;
        }
    }
}