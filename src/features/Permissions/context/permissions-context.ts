import { RoleDetails, Permission } from "API/permissions/type";
import { createContext, useContext } from "react";

export type PermissionsContextValue = {
  role: RoleDetails;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  getFilterPermissions: () => Permission[];
  toggleAddPermission: (permissionID: string) => void;
  toggleEditPermission: (permissionID: string) => void;
  toggleDeletePermission: (permissionID: string) => void;
  toggleViewPermission: (permissionID: string) => void;
  toggleDownloadPermission: (permissionID: string) => void;
  toggleAllPermission: (permissionID: string, on: boolean) => void;
  toggleGlobal: (on_off: boolean) => void;
};

const InitValue = {
  role: { roleId: "", roleName: "", permissions: [], name: "" } as RoleDetails,
  setQuery: () => {},
  getFilterPermissions: () => [],
  toggleAddPermission: (permissionID: string) => {
    console.log(permissionID);
  },
  toggleEditPermission: (permissionID: string) => {
    console.log(permissionID);
  },
  toggleDeletePermission: (permissionID: string) => {
    console.log(permissionID);
  },
  toggleViewPermission: (permissionID: string) => {
    console.log(permissionID);
  },
  toggleDownloadPermission: (permissionID: string) => {
    console.log(permissionID);
  },
  toggleAllPermission: (permissionID: string, on: boolean) => {
    console.log(permissionID, on);
  },
  toggleGlobal: (on_off: boolean) => {
    console.log(on_off);
  },
};

const permissionsContext = createContext<PermissionsContextValue>(InitValue);

const usePermissionsContext = () => useContext(permissionsContext);

export default usePermissionsContext;

export const Provider = permissionsContext.Provider;
