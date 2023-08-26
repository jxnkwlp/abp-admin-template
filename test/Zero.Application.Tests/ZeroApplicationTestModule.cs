using Volo.Abp.Modularity;

namespace Zero;

[DependsOn(
    typeof(ZeroApplicationModule),
    typeof(ZeroDomainTestModule)
    )]
public class ZeroApplicationTestModule : AbpModule
{
}
