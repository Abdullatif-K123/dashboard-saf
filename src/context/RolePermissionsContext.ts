import {
  PermissionAction,
  PermissionName,
  RolePermissions,
} from "API/permissions/type";
import { createContext, useContext } from "react";

export type RolePermissionsContext = {
  permissions: RolePermissions;
  isLoading: boolean;
  isError: boolean;
  hasEditPermission: (permission: PermissionName) => boolean;
  hasAddPermission: (permission: PermissionName) => boolean;
  hasDeletePermission: (permission: PermissionName) => boolean;
  hasDownloadPermission: (permission: PermissionName) => boolean;
  hasPermission: (
    permission: PermissionName,
    action: PermissionAction
  ) => boolean;
};

export const initialContextValue = {
  isLoading: true,
  isError: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasEditPermission: (permission: PermissionName) => false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasAddPermission: (permission: PermissionName) => false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasDeletePermission: (permission: PermissionName) => false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasDownloadPermission: (permission: PermissionName) => false,
  hasPermission: (
    permission: PermissionName,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: PermissionAction = PermissionAction.canView
  ) => false,
};

export const rolePermissionsContext = createContext(initialContextValue);

export const useRoleContext = () => useContext(rolePermissionsContext);

export default rolePermissionsContext.Provider;
