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


                // JWT Authentication Support
                options.AddSecurityDefinition(
                    "Bearer",
                    new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        Type = SecuritySchemeType.Http,
                        Scheme = "Bearer",
                        BearerFormat = "JWT",
                        In = ParameterLocation.Header,
                        Description =
                            "Enter JWT token like: Bearer {your_token}"
                    });


                options.AddSecurityRequirement(
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            Array.Empty<string>()
                        }
                    });
            });

            return services;
        }
    }
}