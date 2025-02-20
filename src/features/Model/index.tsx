import { Stack } from "@mui/material";
import { FC } from "react";
import AddFab from "../../components/buttons/AddFab";
import ModelAction from "./Action";
import ModelRemove from "./Remove";
import ModelsGrid from "./View";
import ModelFilter from "./View/Filter";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";

type Props = {};
const Model: FC<Props> = ({}) => {
  const permissionName = PermissionName.Model;
  const { hasDeletePermission, hasEditPermission, hasAddPermission } =
    useRoleContext();
  const actionPermission =
    hasEditPermission(permissionName) || hasAddPermission(permissionName);
  return (
    <Stack gap={2}>
      <ModelFilter />
      {actionPermission && <ModelAction />}
      <ModelsGrid />
      {hasDeletePermission(permissionName) && <ModelRemove />}
      {hasAddPermission(permissionName) && <AddFab />}
    </Stack>
  );
};
export default Model;
