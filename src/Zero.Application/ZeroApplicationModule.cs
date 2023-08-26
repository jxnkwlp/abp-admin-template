using Passingwind.Abp.DictionaryManagement;
using Passingwind.Abp.DynamicPermissionManagement;
using Passingwind.Abp.FileManagement;
using Passingwind.Abp.IdentityClientManagement;
using SharpAbp.Abp.Account;
using SharpAbp.Abp.AuditLogging;
using SharpAbp.Abp.Identity;
using SharpAbp.Abp.OpenIddict;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Zero;

[DependsOn(
    typeof(ZeroDomainModule),
    typeof(ZeroApplicationContractsModule),
    typeof(AbpAccountApplicationModule),
    typeof(AccountApplicationModule),
    typeof(IdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
[DependsOn(typeof(AuditLoggingApplicationModule))]
[DependsOn(typeof(OpenIddictApplicationModule))]
[DependsOn(typeof(FileManagementApplicationModule))]
[DependsOn(typeof(IdentityClientManagementApplicationModule))]
[DependsOn(typeof(DynamicPermissionManagementApplicationModule))]
[DependsOn(typeof(DictionaryManagementApplicationModule))]
public class ZeroApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options => options.AddMaps<ZeroApplicationModule>());
    }
}
