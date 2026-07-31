using AlgoArena.Application.Features.CodeExecution.Interfaces;
using AlgoArena.Infrastructure.Judge0;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AlgoArena.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.Configure<Judge0Options>(
                configuration.GetSection(Judge0Options.SectionName));

            services.AddHttpClient<IJudge0Service, Judge0Service>(
                (serviceProvider, client) =>
                {
                    var options = serviceProvider
                        .GetRequiredService<
                            Microsoft.Extensions.Options.IOptions<Judge0Options>>()
                        .Value;

                    if (string.IsNullOrWhiteSpace(options.BaseUrl))
                    {
                        throw new InvalidOperationException(
                            "Judge0 BaseUrl is not configured.");
                    }

                    client.BaseAddress = new Uri(
                        options.BaseUrl.TrimEnd('/') + "/");

                    client.Timeout = TimeSpan.FromSeconds(30);

                    if (!string.IsNullOrWhiteSpace(options.ApiKey))
                    {
                        client.DefaultRequestHeaders.TryAddWithoutValidation(
                            "X-RapidAPI-Key",
                            options.ApiKey);
                    }

                    if (!string.IsNullOrWhiteSpace(options.ApiHost))
                    {
                        client.DefaultRequestHeaders.TryAddWithoutValidation(
                            "X-RapidAPI-Host",
                            options.ApiHost);
                    }
                });

            return services;
        }
    }
}