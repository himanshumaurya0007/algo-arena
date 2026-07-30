using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace AlgoArena.API.Swagger
{
    /// <summary>
    /// Registers Swagger/OpenAPI services.
    /// </summary>
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(
            this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(
                    "v1",
                    new OpenApiInfo
                    {
                        Title = "AlgoArena API",
                        Version = "v1",
                        Description = "REST API for AlgoArena."
                    });
            });

            return services;
        }
    }
}