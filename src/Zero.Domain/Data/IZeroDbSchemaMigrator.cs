using System.Threading.Tasks;

namespace Zero.Data;

public interface IZeroDbSchemaMigrator
{
    Task MigrateAsync();
}
