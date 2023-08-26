using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Web;
using Zero.Data;

namespace Zero.Web;

public static class Program
{
    public async static Task<int> Main(string[] args)
    {
        var logger = LogManager.Setup().GetCurrentClassLogger();

        try
        {
            logger.Info("Starting web host.");

            var builder = WebApplication.CreateBuilder(args);
            builder.Host
                .AddAppSettingsSecretsJson()
                .ConfigureLogging((logging) => logging.ClearProviders())
                .UseAutofac()
                .UseNLog(new NLogAspNetCoreOptions { RemoveLoggerFactoryFilter = false });

            await builder.AddApplicationAsync<ZeroWebModule>();
            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                await scope.ServiceProvider.GetRequiredService<ZeroDbMigrationService>().MigrateAsync();
            }
            await app.InitializeApplicationAsync();
            await app.RunAsync();
            return 0;
        }
        catch (Exception ex)
        {
            logger.Error(ex, "Host terminated unexpectedly!");

            return 1;
        }
        finally
        {
            LogManager.Shutdown();
        }
    }
}
