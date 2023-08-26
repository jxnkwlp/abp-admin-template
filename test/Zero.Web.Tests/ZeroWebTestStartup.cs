using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Zero;

public class ZeroWebTestStartup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddApplication<ZeroWebTestModule>();
    }

    public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
    {
        app.InitializeApplication();
    }
}
