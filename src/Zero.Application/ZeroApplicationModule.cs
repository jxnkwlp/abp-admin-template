using Passingwind.Abp.Account;
using Passingwind.Abp.DictionaryManagement;
using Passingwind.Abp.PermissionManagement;
using Passingwind.Abp.FileManagement;
using Passingwind.Abp.Identity;
using Passingwind.Abp.IdentityClient;
using SharpAbp.Abp.AuditLogging;
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
[DependsOn(typeof(IdentityClientApplicationModule))]
[DependsOn(typeof(PermissionManagementApplicationModule))]
[DependsOn(typeof(DictionaryManagementApplicationModule))]
public class ZeroApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options => options.AddMaps<ZeroApplicationModule>());
    }
}
