using System;
using Volo.Abp.Data;
using Volo.Abp.Modularity;

namespace Zero.MongoDB;

[DependsOn(
    typeof(ZeroTestBaseModule),
    typeof(ZeroMongoDbModule)
    )]
public class ZeroMongoDbTestModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var stringArray = ZeroMongoDbFixture.ConnectionString.Split('?');
        var connectionString = stringArray[0].EnsureEndsWith('/') +
                                   "Db_" +
                               Guid.NewGuid().ToString("N") + "/?" + stringArray[1];

        Configure<AbpDbConnectionOptions>(options => options.ConnectionStrings.Default = connectionString);
    }
}
