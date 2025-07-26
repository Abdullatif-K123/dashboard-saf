import { Stack } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import RolesTable from "features/Permissions/RolesTable";
import PermissionAction from "features/Permissions/PermissionAction";
import PermissionRemove from "features/Permissions/Remove";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
import AddFab from "components/buttons/AddFab";
const Permissions = () => {
  const { hasDeletePermission, hasAddPermission } = useRoleContext();
  return (
    <Stack gap={2}>
      <SearchInput />
      <RolesTable />
      <PermissionAction />
      {hasDeletePermission(PermissionName.Permission) && <PermissionRemove />}
      {hasAddPermission(PermissionName.Permission) && <AddFab />}
    </Stack>
  );
};
export default Permissions;
