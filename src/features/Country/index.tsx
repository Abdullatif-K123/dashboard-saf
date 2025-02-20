import { Grid, Stack } from "@mui/material";
import { FC } from "react";
import AddFab from "../../components/buttons/AddFab";
import SearchInput from "../../components/Inputs/SearchInput";
import FilterRow from "../../components/layout/FilterRow";
import CountryAction from "./Action";
import CountryRemove from "./Remove";
import CountryTable from "./View";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";

type Props = {};
const Country: FC<Props> = ({}) => {
  const permissionName = PermissionName.Country;
  const { hasDeletePermission, hasEditPermission, hasAddPermission } =
    useRoleContext();
  const actionPermission =
    hasEditPermission(permissionName) || hasAddPermission(permissionName);

  return (
    <Stack gap={2}>
      <FilterRow>
        <Grid item xs={8} md={4}>
          <SearchInput />
        </Grid>
        <Grid item sm={4} md={2}></Grid>
      </FilterRow>
      <CountryTable />
      {actionPermission && <CountryAction />}
      {hasDeletePermission(permissionName) && <CountryRemove />}
      {hasAddPermission(permissionName) && <AddFab />}
    </Stack>
  );
};
export default Country;
