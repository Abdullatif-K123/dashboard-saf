import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import countryQueries from "API/country/queries";
import EditIconButton from "components/buttons/EditIconButton";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import useTableHeader from "./useTableHeader";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
type Props = {};
const CountryTable: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const { edit, remove } = useEventSearchParams();
  const infiniteQuery = countryQueries.useInfiniteQuery({
    query,
    pageNumber,
  });
  const { data } = infiniteQuery;
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);
  const { hasDeletePermission, hasEditPermission } = useRoleContext();
  const permissionName = PermissionName.Country;
  const actionPermission =
    hasEditPermission(permissionName) || hasDeletePermission(permissionName);
  return (
    <PaginationTable
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      skeleton={true}
      cellCount={tableHeaders.length}
      pageNumber={pageNumber}
      infiniteQuery={infiniteQuery}
    >
      <TableBody>
        {page.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.cityName}</TableCell>
            <TableCell>{row.cityCount}</TableCell>
            <TableCell width={"30%"}>
              {!actionPermission && "-"}
              {actionPermission && (
                <ButtonsStack>
                  {hasEditPermission(permissionName) && (
                    <EditIconButton onClick={() => edit(row.id)} />
                  )}
                  {hasDeletePermission(permissionName) && (
                    <RemoveIconButton onClick={() => remove(row.id)} />
                  )}
                </ButtonsStack>
              )}
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default CountryTable;
