using Volo.Abp.AspNetCore.Mvc;
using Zero.Localization;

namespace Zero.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class ZeroController : AbpControllerBase
{
    protected ZeroController()
    {
        LocalizationResource = typeof(ZeroResource);
    }
}
