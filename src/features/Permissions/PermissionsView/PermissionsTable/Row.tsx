import { TableCell, TableRow } from "@mui/material";
import { Permission, PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionCheckbox } from "features/Permissions/PermissionsView/PermissionsTable/PermissionCheckbox";
import usePermissionsContext from "features/Permissions/context/permissions-context";

const Row = ({ data }: { data: Permission }) => {
  console.log(data);
  const {
    toggleAddPermission,
    toggleDeletePermission,
    toggleEditPermission,
    toggleDownloadPermission,
    toggleViewPermission,
    toggleAllPermission,
  } = usePermissionsContext();
  const isRowChecked =
    data.canAdd &&
    data.canDelete &&
    data.canDownload &&
    data.canEdit &&
    data.canView;

  const { hasEditPermission, hasAddPermission } = useRoleContext();
  const viewOnly =
    !hasEditPermission(PermissionName.Permission) &&
    !hasAddPermission(PermissionName.Permission);

  return (
    <TableRow>
      <TableCell>
        <PermissionCheckbox
          viewOnly={viewOnly}
          checked={isRowChecked}
          onChange={() => toggleAllPermission(data.id, !isRowChecked)}
          label={data.name}
        />
      </TableCell>
      <TableCell sx={{ minWidth: 0 }}>
        <PermissionCheckbox
          viewOnly={viewOnly}
          checked={data.canAdd}
          onChange={() => toggleAddPermission(data.id)}
        />
      </TableCell>
      <TableCell sx={{ minWidth: 0 }}>
        <PermissionCheckbox
          viewOnly={viewOnly}
          checked={data.canEdit}
          onChange={() => toggleEditPermission(data.id)}
        />
      </TableCell>
      <TableCell sx={{ minWidth: 0 }}>
        <PermissionCheckbox
          viewOnly={viewOnly}
          checked={data.canDelete}
          onChange={() => toggleDeletePermission(data.id)}
        />
      </TableCell>
      <TableCell sx={{ minWidth: 0 }}>
        <PermissionCheckbox
          viewOnly={viewOnly}
          checked={data.canView}
          onChange={() => toggleViewPermission(data.id)}
        />
      </TableCell>
      <TableCell sx={{ minWidth: 0 }}>
        <PermissionCheckbox
          viewOnly={viewOnly}
          checked={data.canDownload}
          onChange={() => toggleDownloadPermission(data.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default Row;
