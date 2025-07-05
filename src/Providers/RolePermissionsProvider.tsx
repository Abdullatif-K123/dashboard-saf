import { ReactNode } from "react";
import Provider from "context/RolePermissionsContext";
import { PermissionAction, PermissionName } from "API/permissions/type";
import permissionsQueries from "API/permissions/queries";

type Props = { children: ReactNode };

const RolePermissionsProvider = ({ children }: Props) => {
  const {
    data: permissions,
    isLoading,
    isError,
  } = permissionsQueries.usePermissionsQuery();

  const hasPermission = (
    permission: PermissionName,
    action: PermissionAction = PermissionAction.canView
  ) => {
    const perm = permissions?.find((perm) => perm.name === permission);

    if (perm) {
      return perm[action];
    }
    return false;
  };

  const hasEditPermission = (permission: PermissionName) =>
    hasPermission(permission, PermissionAction.canEdit);
  const hasAddPermission = (permission: PermissionName) =>
    hasPermission(permission, PermissionAction.canAdd);
  const hasDeletePermission = (permission: PermissionName) =>
    hasPermission(permission, PermissionAction.canDelete);
  const hasDownloadPermission = (permission: PermissionName) =>
    hasPermission(permission, PermissionAction.canDownload);

  const value = {
    isLoading,
    isError,
    hasPermission,
    hasDeletePermission,
    hasAddPermission,
    hasEditPermission,
    hasDownloadPermission,
  };

  return <Provider value={value}>{children}</Provider>;
};
export default RolePermissionsProvider;
