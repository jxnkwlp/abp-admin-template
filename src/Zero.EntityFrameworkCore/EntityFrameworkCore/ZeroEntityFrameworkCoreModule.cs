using Microsoft.Extensions.DependencyInjection;
using Passingwind.Abp.DictionaryManagement.EntityFrameworkCore;
using Passingwind.Abp.PermissionManagement.EntityFrameworkCore;
using Passingwind.Abp.FileManagement.EntityFrameworkCore;
using Passingwind.Abp.Identity.EntityFrameworkCore;
using Passingwind.Abp.IdentityClient.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.SqlServer;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Zero.EntityFrameworkCore;

[DependsOn(
    typeof(ZeroDomainModule),
    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule),
    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpEntityFrameworkCoreSqlServerModule),
    typeof(AbpBackgroundJobsEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule)
    )]
[DependsOn(typeof(FileManagementEntityFrameworkCoreModule))]
[DependsOn(typeof(IdentityClientEntityFrameworkCoreModule))]
[DependsOn(typeof(IdentityEntityFrameworkCoreModule))]
[DependsOn(typeof(PermissionManagementEntityFrameworkCoreModule))]
[DependsOn(typeof(DictionaryManagementEntityFrameworkCoreModule))]
public class ZeroEntityFrameworkCoreModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        ZeroEfCoreEntityExtensionMappings.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<ZeroDbContext>(options =>
        {
            /* Remove "includeAllEntities: true" to create
             * default repositories only for aggregate roots */
            options.AddDefaultRepositories(includeAllEntities: true);
        });

        Configure<AbpDbContextOptions>(options =>
        {
            /* The main point to change your DBMS.
             * See also ZeroMigrationsDbContextFactory for EF Core tooling. */
            options.UseSqlServer();
        });
    }
}
