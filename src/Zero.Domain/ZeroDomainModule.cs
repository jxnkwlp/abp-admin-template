using Passingwind.Abp.Account;
using Passingwind.Abp.DictionaryManagement;
using Passingwind.Abp.PermissionManagement;
using Passingwind.Abp.FileManagement;
using Passingwind.Abp.Identity;
using Passingwind.Abp.IdentityClient;
using SharpAbp.Abp.AuditLogging;
using SharpAbp.Abp.OpenIddict;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.OpenIddict;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.PermissionManagement.OpenIddict;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Zero.MultiTenancy;

namespace Zero;

[DependsOn(
    typeof(ZeroDomainSharedModule),
    typeof(AbpAuditLoggingDomainModule),
    typeof(AbpBackgroundJobsDomainModule),
    typeof(AbpEmailingModule),
    typeof(AbpFeatureManagementDomainModule),
    typeof(AbpIdentityDomainModule),
    typeof(AbpOpenIddictDomainModule),
    typeof(AbpPermissionManagementDomainIdentityModule),
    typeof(AbpPermissionManagementDomainOpenIddictModule),
    typeof(AbpSettingManagementDomainModule),
    typeof(AbpTenantManagementDomainModule)
)]
[DependsOn(typeof(AuditLoggingDomainModule))]
[DependsOn(typeof(DictionaryManagementDomainModule))]
[DependsOn(typeof(PermissionManagementDomainModule))]
[DependsOn(typeof(FileManagementDomainModule))]
[DependsOn(typeof(IdentityClientDomainModule))]
[DependsOn(typeof(IdentityDomainModule))]
[DependsOn(typeof(AccountDomainModule))]
[DependsOn(typeof(OpenIddictDomainModule))]
public class ZeroDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpMultiTenancyOptions>(options => options.IsEnabled = MultiTenancyConsts.IsEnabled);
    }
}
