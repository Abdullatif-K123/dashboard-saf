import { Chip, TableHead, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Stack } from "@mui/system";
import accountQueries from "API/account/queries";
import EditIconButton from "components/buttons/EditIconButton";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getPage } from "utils/apiHelpers";
import useTableHeader from "./useTableHeader";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
type Props = {};
const AccountTable: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const { edit, remove } = useEventSearchParams();
  const infiniteQuery = accountQueries.useInfiniteQuery({
    query,
    pageNumber,
  });
  const { data } = infiniteQuery;
  const { t } = useTranslation();
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);

  const { hasEditPermission, hasDeletePermission } = useRoleContext();
  const permissionName = PermissionName.Account;
  const actionPermission =
    hasEditPermission(permissionName) || hasDeletePermission(permissionName);
  return (
    <PaginationTable
      skeleton={true}
      cellCount={tableHeaders.length}
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      pageNumber={pageNumber}
      infiniteQuery={infiniteQuery}
    >
      <TableBody>
        {page.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.userName}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell sx={{ width: 0 }}>
              <Stack direction="row" gap={0.5} justifyContent={"center"}>
                {row.rolesName.map((name) => (
                  <Chip key={name} label={t(`enum.Userkind.${name}`)} />
                ))}
              </Stack>
            </TableCell>
            <TableCell>
              {!actionPermission && "-"}
              {actionPermission && (
                <Stack direction="row" justifyContent="center" gap={0.5}>
                  {hasEditPermission(permissionName) && (
                    <EditIconButton onClick={() => edit(row.id)} />
                  )}
                  {hasDeletePermission(permissionName) && (
                    <RemoveIconButton onClick={() => remove(row.id)} />
                  )}
                </Stack>
              )}
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default AccountTable;
