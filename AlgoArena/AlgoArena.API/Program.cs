using AlgoArena.API.Swagger;
using AlgoArena.Application.DependencyInjection;
using AlgoArena.Infrastructure.DependencyInjection;
using AlgoArena.Persistence.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AlgoArena.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Controllers
            builder.Services.AddControllers();

            // Authorization
            builder.Services.AddAuthorization();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontendPolicy", policy =>
                {
                    policy
                        .WithOrigins(
                            "http://localhost:5173",
                            "https://algo-arena-platform.netlify.app"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Swagger
            builder.Services.AddSwaggerDocumentation();

            // Application Layer
            builder.Services.AddApplication();

            // Infrastructure Layer
            builder.Services.AddInfrastructure(builder.Configuration);

            // Persistence Layer
            builder.Services.AddPersistence(builder.Configuration);

            // JWT Authentication
            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,

                            ValidIssuer =
                                builder.Configuration["Jwt:Issuer"],

                            ValidAudience =
                                builder.Configuration["Jwt:Audience"],

                            IssuerSigningKey =
                                new SymmetricSecurityKey(
                                    Encoding.UTF8.GetBytes(
                                        builder.Configuration["Jwt:Key"]!
                                    ))
                        };
                });

            var app = builder.Build();

            // Swagger
            // if (app.Environment.IsDevelopment())
            // {
                app.UseSwagger();

                app.UseSwaggerUI(options =>
                {
                    options.DocumentTitle = "AlgoArena API";

                    options.SwaggerEndpoint(
                        "/swagger/v1/swagger.json",
                        "AlgoArena API v1");
                });
            // }

            // HTTPS
            // app.UseHttpsRedirection();

            // CORS
            app.UseCors("FrontendPolicy");

            // Authentication
            app.UseAuthentication();

            // Authorization
            app.UseAuthorization();

            // Controllers
            app.MapControllers();

            app.Run();
        }
    }
}