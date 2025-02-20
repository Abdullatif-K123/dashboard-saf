import { Stack } from "@mui/material";
import { FC } from "react";
import AddFab from "../../components/buttons/AddFab";
import RegionAction from "./Action";
import RegionRemove from "./Remove";
import RegionTable from "./View";
import RegionFilter from "./View/Filter";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";

type Props = {};
const Region: FC<Props> = ({}) => {
  const permissionName = PermissionName.Region;
  const { hasDeletePermission, hasEditPermission, hasAddPermission } =
    useRoleContext();
  const actionPermission =
    hasEditPermission(permissionName) || hasAddPermission(permissionName);

  return (
    <Stack gap={2}>
      <RegionFilter />
      <RegionTable />
      {actionPermission && <RegionAction />}
      {hasDeletePermission(permissionName) && <RegionRemove />}
      {hasAddPermission(permissionName) && <AddFab />}
    </Stack>
  );
};
export default Region;
