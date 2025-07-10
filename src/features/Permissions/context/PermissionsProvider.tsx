import { ReactNode, useReducer, useState } from "react";

import { Provider } from "features/Permissions/context/permissions-context";
import { RoleDetails } from "API/permissions/type";

type Actions =
  | {
      type:
        | "TOGGLE_ADD"
        | "TOGGLE_EDIT"
        | "TOGGLE_DELETE"
        | "TOGGLE_VIEW"
        | "TOGGLE_DOWNLOAD";

      permissionID: string;
    }
  | {
      type: "TOGGLE_ALL";
      permissionID: string;
      on: boolean;
    }
  | {
      type: "TOGGLE_GLOBAL";
      on_off: boolean;
    };

const reducer = (state: RoleDetails, action: Actions) => {
  const newContents = [...state.permissions];
  switch (action.type) {
    case "TOGGLE_ADD":
      {
        const permIdx = state.contents.findIndex(
          (perm) => perm.id === action.permissionID
        );
        if (permIdx !== -1) {
          const perm = state.contents[permIdx];
          const canView = !perm.canAdd ? true : perm.canView;
          newContents[permIdx] = { ...perm, canAdd: !perm.canAdd, canView };
        }
      }
      break;
    case "TOGGLE_EDIT":
      {
        const permIdx = state.contents.findIndex(
          (perm) => perm.id === action.permissionID
        );
        if (permIdx !== -1) {
          const perm = state.contents[permIdx];
          const canView = !perm.canAdd ? true : perm.canView;
          newContents[permIdx] = { ...perm, canEdit: !perm.canEdit, canView };
        }
      }
      break;
    case "TOGGLE_DELETE":
      {
        const permIdx = state.contents.findIndex(
          (perm) => perm.id === action.permissionID
        );
        if (permIdx !== -1) {
          const perm = state.contents[permIdx];
          const canView = !perm.canAdd ? true : perm.canView;
          newContents[permIdx] = {
            ...perm,
            canDelete: !perm.canDelete,
            canView,
          };
        }
      }
      break;
    case "TOGGLE_VIEW":
      {
        const permIdx = state.contents.findIndex(
          (perm) => perm.id === action.permissionID
        );
        if (permIdx !== -1) {
          const perm = state.contents[permIdx];
          newContents[permIdx] = {
            ...perm,
            canView: !perm.canView,
            canAdd: perm.canView ? false : perm.canAdd,
            canDelete: perm.canView ? false : perm.canDelete,
            canEdit: perm.canView ? false : perm.canEdit,
            canDownload: perm.canView ? false : perm.canDownload,
          };
        }
      }
      break;
    case "TOGGLE_DOWNLOAD":
      {
        const permIdx = state.contents.findIndex(
          (perm) => perm.id === action.permissionID
        );
        if (permIdx !== -1) {
          const perm = state.contents[permIdx];
          const canView = !perm.canAdd ? true : perm.canView;
          newContents[permIdx] = {
            ...perm,
            canDownload: !perm.canDownload,
            canView,
          };
        }
      }
      break;
    case "TOGGLE_ALL":
      {
        const permIdx = state.contents.findIndex(
          (perm) => perm.id === action.permissionID
        );
        if (permIdx !== -1) {
          const perm = state.contents[permIdx];
          newContents[permIdx] = {
            ...perm,
            canAdd: action.on,
            canDelete: action.on,
            canEdit: action.on,
            canDownload: action.on,
            canView: action.on,
          };
        }
      }
      break;
    case "TOGGLE_GLOBAL": {
      newContents.map((el, idx, arr) => {
        arr[idx] = {
          id: el.id,
          name: el.name,
          canAdd: action.on_off,
          canDelete: action.on_off,
          canDownload: action.on_off,
          canView: action.on_off,
          canEdit: action.on_off,
        };
      });
    }
  }
  return { ...state, permissions: newContents };
};

type PermissionsProviderProps = { data: RoleDetails; children: ReactNode };

const PermissionsProvider = ({ data, children }: PermissionsProviderProps) => {
  const [role, dispatch] = useReducer(reducer, data);
  const [q, setQ] = useState("");
  const ctxVlue = {
    role,
    setQuery: setQ,
    getFilterPermissions: () => {
      if (q.trim().length === 0) {
        return role.permissions;
      }
      return role.permissions.filter((el) => {
        const str1 = el.name.toLowerCase();
        const str2 = q.toLowerCase();
        return str1.includes(str2) || str2.includes(str1);
      });
    },
    toggleAddPermission: (permissionID: string) => {
      dispatch({ type: "TOGGLE_ADD", permissionID });
    },
    toggleEditPermission: (permissionID: string) => {
      dispatch({ type: "TOGGLE_EDIT", permissionID });
    },
    toggleDeletePermission: (permissionID: string) => {
      dispatch({ type: "TOGGLE_DELETE", permissionID });
    },
    toggleViewPermission: (permissionID: string) => {
      dispatch({ type: "TOGGLE_VIEW", permissionID });
    },
    toggleDownloadPermission: (permissionID: string) => {
      dispatch({ type: "TOGGLE_DOWNLOAD", permissionID });
    },
    toggleAllPermission: (permissionID: string, on: boolean) => {
      dispatch({ type: "TOGGLE_ALL", permissionID, on });
    },
    toggleGlobal: (on_off: boolean) => {
      dispatch({ type: "TOGGLE_GLOBAL", on_off });
    },
  };

  return <Provider value={ctxVlue}>{children}</Provider>;
};

export default PermissionsProvider;
