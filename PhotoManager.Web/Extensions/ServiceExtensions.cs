using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PhotoManager.MongoRepositories;
using PhotoManager.MongoRepositories.Options;
using PhotoManager.MongoRepositories.Repositories;
using PhotoManager.Web.Filters;

namespace PhotoManager.Web.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var instance = configuration.GetSection("AzureAD:Instance").Value;
            var tenantId = configuration.GetSection("AzureAD:TenantId").Value;
            var clientId = configuration.GetSection("AzureAD:ClientId").Value;

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = $"{instance}{tenantId}";
                    options.Audience = $"api://{clientId}";
                    options.TokenValidationParameters.ValidateLifetime = true;
                });
        }

        public static void ConfigureSpaStaticFiles(this IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public static void ConfigureMongoOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(x => new MongoOptions(configuration.GetSection("MongoConnectionString").Value));
        }

        public static void ConfigureDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<PhotoManagerContext>();

            services.AddTransient(x => new Cloudinary(
                new Account
                {
                    Cloud = configuration.GetSection("CloudinaryAccount:Cloud").Value,
                    ApiKey = configuration.GetSection("CloudinaryAccount:ApiKey").Value,
                    ApiSecret = configuration.GetSection("CloudinaryAccount:ApiSecret").Value
                }
            ));

            services.AddTransient<PhotoRepository>();
            services.AddTransient<AlbumRepository>();
        }

        public static void ConfigureModelStateValidation(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ValidateModelStateAttribute));
            });
        }
    }
}
