using Localization.Resources.AbpUi;
using Passingwind.Abp.DictionaryManagement;
using Passingwind.Abp.DynamicPermissionManagement;
using Passingwind.Abp.FileManagement;
using Passingwind.Abp.IdentityClientManagement;
using SharpAbp.Abp.Account;
using SharpAbp.Abp.AuditLogging;
using SharpAbp.Abp.Identity;
using SharpAbp.Abp.OpenIddict;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Zero.Localization;

namespace Zero;

[DependsOn(
    typeof(ZeroApplicationContractsModule),
    typeof(AccountHttpApiModule),
    typeof(IdentityHttpApiModule),
    typeof(AbpPermissionManagementHttpApiModule),
    typeof(AbpTenantManagementHttpApiModule),
    typeof(AbpFeatureManagementHttpApiModule),
    typeof(AbpSettingManagementHttpApiModule)
    )]
[DependsOn(typeof(AuditLoggingHttpApiModule))]
[DependsOn(typeof(OpenIddictHttpApiModule))]
[DependsOn(typeof(FileManagementHttpApiModule))]
[DependsOn(typeof(IdentityClientManagementHttpApiModule))]
[DependsOn(typeof(DynamicPermissionManagementHttpApiModule))]
[DependsOn(typeof(DictionaryManagementHttpApiModule))]
public class ZeroHttpApiModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureLocalization();
    }

    private void ConfigureLocalization()
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<ZeroResource>()
                .AddBaseTypes(
                    typeof(AbpUiResource)
                );
        });
    }
}
