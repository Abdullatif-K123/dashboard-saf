import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BranchSelect } from "API/branch/type";
import busQueries from "API/bus/queries";
import { OwnerSelect } from "API/owner/type";
import { RegionSelect } from "API/region/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import LTR from "components/layout/LTR";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import useObjectSearchParam from "hooks/useObjectSearchParam";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import useTableHeader from "./useTableHeader";
type Props = {};
const BusesTable: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  const ownerId = useObjectSearchParam<OwnerSelect>("owner")?.id ?? null;
  const regionId = useObjectSearchParam<RegionSelect>("region")?.id ?? null;
  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id ?? null;
  const { details } = useEventSearchParams();
  const infiniteQuery = busQueries.useInfiniteQuery(
    {
      query,
      pageNumber,
    },
    { ownerId, regionId, branchId }
  );

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
          <TableRowStriped key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.number}</TableCell>
            <TableCell>{row.chairCount}</TableCell>
            <TableCell>{row.branchName}</TableCell>
            <TableCell>
              {row.cityName} - {row.regionName}
            </TableCell>
            <TableCell>{row.ownerName}</TableCell>
            <TableCell>
              <LTR>{row.ownerPhoneNumber}</LTR>
            </TableCell>
            <TableCell>
              <ButtonsStack>
                <ShowIconButton onClick={() => details(row.id)} />
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default BusesTable;
