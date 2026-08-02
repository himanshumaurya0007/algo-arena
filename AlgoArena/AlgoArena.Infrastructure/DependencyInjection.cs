using AlgoArena.Application.Features.CodeExecution.Interfaces;
using AlgoArena.Domain.Interfaces.Security;
using AlgoArena.Infrastructure.JDoodle;
using AlgoArena.Infrastructure.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace AlgoArena.Infrastructure.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IPasswordHasher, PasswordHasher>();

            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            // JDoodle configuration
            services.Configure<JDoodleOptions>(
                configuration.GetSection(JDoodleOptions.SectionName));

            // JDoodle HTTP client
            services.AddHttpClient<IJDoodleService, JDoodleService>(
                (serviceProvider, client) =>
                {
                    var options = serviceProvider
                        .GetRequiredService<IOptions<JDoodleOptions>>()
                        .Value;

                    if (string.IsNullOrWhiteSpace(options.BaseUrl))
                    {
                        throw new InvalidOperationException(
                            "JDoodle BaseUrl is not configured.");
                    }

                    if (string.IsNullOrWhiteSpace(options.ClientId))
                    {
                        throw new InvalidOperationException(
                            "JDoodle ClientId is not configured.");
                    }

                    if (string.IsNullOrWhiteSpace(options.ClientSecret))
                    {
                        throw new InvalidOperationException(
                            "JDoodle ClientSecret is not configured.");
                    }

                    client.BaseAddress =
                        new Uri(options.BaseUrl.TrimEnd('/') + "/");

                    client.Timeout =
                        TimeSpan.FromSeconds(30);
                });

            return services;
        }
    }
}