import { FC } from "react";
import VersionAction from "./Action";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
import AddFab from "components/buttons/AddFab";
import FilterRow from "components/layout/FilterRow";
import SearchInput from "components/Inputs/SearchInput";
import { Stack, Grid } from "@mui/material";
import VersionTable from "./View";
import VersionDetails from "./Details";
import VersionRemove from "./Remove/index";
export type VersionProps = {};
export const Version: FC<VersionProps> = () => {
  const permissionName = PermissionName.Setting;
  const { hasAddPermission, hasDeletePermission, hasEditPermission } =
    useRoleContext();
  return (
    <Stack gap={2}>
      <FilterRow>
        <Grid item xs={8} md={4}>
          <SearchInput />
        </Grid>
      </FilterRow>
      <VersionTable />
      <VersionAction />
      <VersionDetails />
      {hasAddPermission(permissionName) && <AddFab />}
      {hasDeletePermission(permissionName) && <VersionRemove />}
    </Stack>
  );
};

export default Version;
