import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { getPage } from "utils/apiHelpers";
import useTableHeader from "./useTableHeader";
import permissionsQueries from "API/permissions/queries";
import ActionButton from "features/Permissions/RolesTable/ActionButton";

const RolesTable = () => {
  const pageNumber = usePageNumberSearchParam();
  const query = useQuerySearchParam();

  const infiniteQuery = permissionsQueries.useInfiniteQuery({
    query,
    pageNumber,
  });

  const { data } = infiniteQuery;
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);
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
          <TableRowStriped key={row.roleId}>
            <TableCell>{row.roleName}</TableCell>
            <TableCell
              sx={{
                width: 0,
                maxWidth: 200,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {row?.permissions?.length === 0
                ? "-"
                : row?.permissions.map((p) => p.name)?.join(", ")}
            </TableCell>
            <TableCell>
              <ButtonsStack>
                <ActionButton id={row.roleId} />
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default RolesTable;
