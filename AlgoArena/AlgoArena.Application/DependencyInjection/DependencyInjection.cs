using AlgoArena.Application.Features.Problems.Mappings;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace AlgoArena.Application.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();

            services.AddMediatR(configuration =>
            {
                configuration.RegisterServicesFromAssembly(assembly);
            });

            services.AddAutoMapper(configuration =>
            {
                configuration.AddProfile<ProblemMappingProfile>();
            });

            services.AddValidatorsFromAssembly(assembly);

            return services;
        }
    }
}