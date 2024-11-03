using Localization.Resources.AbpUi;
using Passingwind.Abp.Account;
using Passingwind.Abp.DictionaryManagement;
using Passingwind.Abp.PermissionManagement;
using Passingwind.Abp.FileManagement;
using Passingwind.Abp.Identity;
using Passingwind.Abp.IdentityClient;
using SharpAbp.Abp.AuditLogging;
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
[DependsOn(typeof(IdentityClientHttpApiModule))]
[DependsOn(typeof(PermissionManagementHttpApiModule))]
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
