import { Stack } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import RolesTable from "features/Permissions/RolesTable";
import PermissionAction from "features/Permissions/PermissionAction";

const Permissions = () => {
  return (
    <Stack gap={2}>
      <SearchInput />
      <RolesTable />
      <PermissionAction />
    </Stack>
  );
};
export default Permissions;
