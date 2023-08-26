using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Zero.Data;

/* This is used if database provider does't define
 * IZeroDbSchemaMigrator implementation.
 */
public class NullZeroDbSchemaMigrator : IZeroDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
