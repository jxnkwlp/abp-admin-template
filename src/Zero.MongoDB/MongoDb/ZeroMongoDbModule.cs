using Microsoft.Extensions.DependencyInjection;
using Passingwind.Abp.DictionaryManagement.MongoDB;
using Passingwind.Abp.PermissionManagement.MongoDB;
using Passingwind.Abp.FileManagement.MongoDB;
using Passingwind.Abp.Identity.MongoDB;
using Passingwind.Abp.IdentityClient.MongoDB;
using Volo.Abp.AuditLogging.MongoDB;
using Volo.Abp.BackgroundJobs.MongoDB;
using Volo.Abp.FeatureManagement.MongoDB;
using Volo.Abp.Identity.MongoDB;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict.MongoDB;
using Volo.Abp.PermissionManagement.MongoDB;
using Volo.Abp.SettingManagement.MongoDB;
using Volo.Abp.TenantManagement.MongoDB;
using Volo.Abp.Uow;

namespace Zero.MongoDB;

[DependsOn(
    typeof(ZeroDomainModule),
    typeof(AbpPermissionManagementMongoDbModule),
    typeof(AbpSettingManagementMongoDbModule),
    typeof(AbpIdentityMongoDbModule),
    typeof(AbpOpenIddictMongoDbModule),
    typeof(AbpBackgroundJobsMongoDbModule),
    typeof(AbpAuditLoggingMongoDbModule),
    typeof(AbpTenantManagementMongoDbModule),
    typeof(AbpFeatureManagementMongoDbModule)
    )]
[DependsOn(typeof(FileManagementMongoDbModule))]
[DependsOn(typeof(IdentityClientMongoDbModule))]
[DependsOn(typeof(IdentityMongoDbModule))]
[DependsOn(typeof(PermissionManagementMongoDbModule))]
[DependsOn(typeof(DictionaryManagementMongoDbModule))]
public class ZeroMongoDbModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddMongoDbContext<ZeroMongoDbContext>(options => options.AddDefaultRepositories());

        Configure<AbpUnitOfWorkDefaultOptions>(options => options.TransactionBehavior = UnitOfWorkTransactionBehavior.Disabled);
    }
}
