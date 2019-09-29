using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;

namespace PhotoManager.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    var builtConfig = config.Build();
                    config.AddAzureKeyVault(
                        builtConfig["AzureKeyVault:Dns"],
                        builtConfig["AzureAD:ClientId"],
                        builtConfig["AzureAD:ClientSecret"],
                        new DefaultKeyVaultSecretManager());
                })
                .UseStartup<Startup>();
    }
}
