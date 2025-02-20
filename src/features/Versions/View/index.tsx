import { FC } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { getPage } from "utils/apiHelpers";
import useTableHeader from "./useTableHeader";
import versionQueries from "API/version/queries";
import ButtonsStack from "components/layout/ButtonsStack";
import ShowIconButton from "components/buttons/ShowIconButton";
type Props = {};
const VersionTable: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const { edit, remove, details } = useEventSearchParams();
  const infiniteQuery = versionQueries.useInfiniteQuery({
    query,
    pageNumber,
  });
  const { data } = infiniteQuery;
  const tableHeader = useTableHeader();
  const page = getPage(data, pageNumber);
  return (
    <PaginationTable
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeader.map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      skeleton={true}
      cellCount={tableHeader.length}
      pageNumber={pageNumber}
      infiniteQuery={infiniteQuery}
    >
      {page.map((row) => (
        <TableRowStriped key={row.id}>
          <TableCell>{row.currentVersion}</TableCell>
          <TableCell>{row.minimumVersion}</TableCell>
          <TableCell>
            <ButtonsStack>
              <ShowIconButton onClick={() => details(row.id)} />
           </ButtonsStack>
          </TableCell>
        </TableRowStriped>
      ))}
    </PaginationTable>
  );
};

export default VersionTable;
