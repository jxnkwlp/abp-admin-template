using Volo.Abp.Authorization.Permissions;

namespace Zero.Permissions;

public class ZeroPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(ZeroPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(ZeroPermissions.MyPermission1, L("Permission:MyPermission1"));
    }
}
