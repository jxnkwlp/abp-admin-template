using SharpAbp.Abp.AuditLogging;
using SharpAbp.Abp.Identity;
using SharpAbp.Abp.OpenIddict;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;
using Zero.Localization;

namespace Zero;

[DependsOn(
    typeof(AbpAuditLoggingDomainSharedModule),
    typeof(AbpBackgroundJobsDomainSharedModule),
    typeof(AbpFeatureManagementDomainSharedModule),
    typeof(AbpIdentityDomainSharedModule),
    typeof(AbpOpenIddictDomainSharedModule),
    typeof(AbpPermissionManagementDomainSharedModule),
    typeof(AbpSettingManagementDomainSharedModule),
    typeof(AbpTenantManagementDomainSharedModule)
    )]
[DependsOn(typeof(AuditLoggingDomainSharedModule))]
[DependsOn(typeof(IdentityDomainSharedModule))]
[DependsOn(typeof(OpenIddictDomainSharedModule))]
public class ZeroDomainSharedModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        ZeroGlobalFeatureConfigurator.Configure();
        ZeroModuleExtensionConfigurator.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options => options.FileSets.AddEmbedded<ZeroDomainSharedModule>());

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Add<ZeroResource>("en")
                .AddBaseTypes(typeof(AbpValidationResource))
                .AddVirtualJson("/Localization/Zero");

            options.DefaultResourceType = typeof(ZeroResource);
        });

        Configure<AbpExceptionLocalizationOptions>(options => options.MapCodeNamespace("Zero", typeof(ZeroResource)));
    }
}
