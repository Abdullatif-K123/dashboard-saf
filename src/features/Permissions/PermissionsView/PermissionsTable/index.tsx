import {
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Row from "features/Permissions/PermissionsView/PermissionsTable/Row";
import ToggleAllCheckbox from "features/Permissions/PermissionsView/PermissionsTable/ToggleAllCheckbox";
import usePermissionsContext from "features/Permissions/context/permissions-context";
import { useTranslation } from "react-i18next";

const PermissionsTable = ({ sx }: { sx?: SxProps }) => {
  const { t } = useTranslation();
  const { getFilterPermissions } = usePermissionsContext();
  const filteredPermissions = getFilterPermissions();
  console.log();
  return (
    <Stack sx={{ ...sx }}>
      <TableContainer sx={{ overflowX: "initial" }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: "primary.main" }}>
                <ToggleAllCheckbox label={t("permissions.root")} />
              </TableCell>
              <TableCell sx={{ minWidth: 0, bgcolor: "primary.main" }}>
                {t("permissions.addPermission")}
              </TableCell>
              <TableCell sx={{ minWidth: 0, bgcolor: "primary.main" }}>
                {t("permissions.editPermission")}
              </TableCell>
              <TableCell sx={{ minWidth: 0, bgcolor: "primary.main" }}>
                {t("permissions.deletePermission")}
              </TableCell>
              <TableCell sx={{ minWidth: 0, bgcolor: "primary.main" }}>
                {t("permissions.viewPermission")}
              </TableCell>
              <TableCell sx={{ minWidth: 0, bgcolor: "primary.main" }}>
                {t("permissions.downloadPermission")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPermissions?.length === 0 && (
              <TableCell rowSpan={6}>
                {t("permissions.message.noSearchResult")}
              </TableCell>
            )}
            {filteredPermissions?.length > 0 &&
              filteredPermissions.map((perm) => (
                <Row key={perm.id} data={perm} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default PermissionsTable;
