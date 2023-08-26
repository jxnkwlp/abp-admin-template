using Volo.Abp.Autofac;
using Volo.Abp.Modularity;
using Zero.EntityFrameworkCore;

namespace Zero.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ZeroEntityFrameworkCoreModule),
    typeof(ZeroApplicationContractsModule)
    )]
public class ZeroDbMigratorModule : AbpModule
{
}
