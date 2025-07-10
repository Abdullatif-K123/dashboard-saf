import { Grid, Stack } from "@mui/material";
import AddFab from "components/buttons/AddFab";
import { FC } from "react";
import SearchInput from "../../components/Inputs/SearchInput";
import FilterRow from "../../components/layout/FilterRow";
import AccountAction from "./Action";
import AccountRemove from "./Remove";
import AccountTable from "./View";
import RemoveFilesButton from "./View/RemoveFilesButton";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
type Props = {};
const Account: FC<Props> = ({}) => {
  const permissionName = PermissionName.Account;
  const { hasDeletePermission, hasEditPermission, hasAddPermission } =
    useRoleContext();
  const actionPermission =
    hasEditPermission(permissionName) || hasAddPermission(permissionName);

  return (
    <Stack gap={2}>
      <FilterRow>
        <Grid item sm={12} md={4}>
          <SearchInput />
        </Grid>
        <Grid item xs>
          <Stack>
            {hasDeletePermission(permissionName) && (
              <RemoveFilesButton
                sx={{ fontSize: "0.8rem", ml: "auto" }}
                loadingSize={15}
              />
            )}
          </Stack>
        </Grid>
      </FilterRow>
      <AccountTable />

      {actionPermission && <AccountAction />}
      {hasDeletePermission(permissionName) && <AccountRemove />}
      {hasAddPermission(permissionName) && <AddFab />}
    </Stack>
  );
};
export default Account;
