import { Stack } from "@mui/material";
import { FC } from "react";
import AddFab from "../../components/buttons/AddFab";
import CityAction from "./Action";
import CityRemove from "./Remove";
import CitiesTable from "./View";
import CityFilter from "./View/Filter";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";

type Props = {};
const City: FC<Props> = ({}) => {
  const permissionName = PermissionName.City;
  const { hasDeletePermission, hasEditPermission, hasAddPermission } =
    useRoleContext();
  const actionPermission =
    hasEditPermission(permissionName) || hasAddPermission(permissionName);

  return (
    <Stack gap={2}>
      <CityFilter />
      <CitiesTable />
      {actionPermission && <CityAction />}
      {hasDeletePermission(permissionName) && <CityRemove />}
      {hasAddPermission(permissionName) && <AddFab />}
    </Stack>
  );
};
export default City;
