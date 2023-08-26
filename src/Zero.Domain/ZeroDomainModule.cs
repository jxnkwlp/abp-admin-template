using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Passingwind.Abp.DictionaryManagement;
using Passingwind.Abp.DynamicPermissionManagement;
using Passingwind.Abp.FileManagement;
using Passingwind.Abp.IdentityClientManagement;
using SharpAbp.Abp.AuditLogging;
using SharpAbp.Abp.Identity;
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
[DependsOn(typeof(DynamicPermissionManagementDomainModule))]
[DependsOn(typeof(FileManagementDomainModule))]
[DependsOn(typeof(IdentityClientManagementDomainModule))]
[DependsOn(typeof(IdentityDomainModule))]
[DependsOn(typeof(OpenIddictDomainModule))]
public class ZeroDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpMultiTenancyOptions>(options => options.IsEnabled = MultiTenancyConsts.IsEnabled);

#if DEBUG
        context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
    }
}
