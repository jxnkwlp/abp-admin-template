using Volo.Abp.Modularity;
using Zero.EntityFrameworkCore;

namespace Zero;

[DependsOn(
    typeof(ZeroEntityFrameworkCoreTestModule)
    )]
public class ZeroDomainTestModule : AbpModule
{
}
