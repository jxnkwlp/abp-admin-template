using Volo.Abp.Application.Services;
using Zero.Localization;

namespace Zero;

/* Inherit your application services from this class.
 */
public abstract class ZeroAppService : ApplicationService
{
    protected ZeroAppService()
    {
        LocalizationResource = typeof(ZeroResource);
    }
}
