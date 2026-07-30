using AlgoArena.API.Swagger;
using AlgoArena.Application.DependencyInjection;
using AlgoArena.Persistence.DependencyInjection;

namespace AlgoArena.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Controllers
            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontendPolicy", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Swagger
            builder.Services.AddSwaggerDocumentation();

            // Application Layer
            builder.Services.AddApplication();

            // Persistence Layer
            builder.Services.AddPersistence(builder.Configuration);

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();

                app.UseSwaggerUI(options =>
                {
                    options.DocumentTitle = "AlgoArena API";

                    options.SwaggerEndpoint(
                        "/swagger/v1/swagger.json",
                        "AlgoArena API v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseCors("FrontendPolicy");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}