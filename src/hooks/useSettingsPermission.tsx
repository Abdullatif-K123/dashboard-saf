import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
import { useCallback } from "react";
const useSettingsPermission = () => {
  const { hasEditPermission: _hasEditPermission, hasPermission } =
    useRoleContext();
  const settingsLinkPermission = () => {
    return (
      hasPermission(PermissionName.Setting) ||
      hasPermission(PermissionName.City) ||
      hasPermission(PermissionName.Country) ||
      hasPermission(PermissionName.Region)
    );
  };
  return {
    hasEditPermission: useCallback(
      () => _hasEditPermission(PermissionName.Setting),
      [_hasEditPermission]
    ),
    settingsLinkPermission,
  };
};

export default useSettingsPermission;
