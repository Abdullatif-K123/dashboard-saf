import { TableHead, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { BranchSelect } from "API/branch/type";
import { OwnerSelect } from "API/owner/type";
import tourQueries from "API/tour/queries";
import ShowIconButton from "components/buttons/ShowIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import { TourStatus } from "constants/enums";
import useEventSearchParams from "hooks/useEventSearchParams";
import useNumberEnumSearchParam from "hooks/useNumberEnumSearchParam";
import useObjectSearchParam from "hooks/useObjectSearchParam";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import TourStatusColored from "../TourStatusColored";
import useTableHeader from "./useTableHeader";
import ReservationButton from "features/Tours/View/ReservationButton";
type Props = {};
const ToursTable: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  const ownerId = useObjectSearchParam<OwnerSelect>("owner")?.id ?? null;
  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id ?? null;
  const tourStatus = useNumberEnumSearchParam<TourStatus>("tourStatus");
  const { details } = useEventSearchParams();
  const infiniteQuery = tourQueries.useInfiniteQuery(
    {
      query,
      pageNumber,
    },
    { branchId, ownerId, tourStatus }
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
            <TableCell>{row.ownerName}</TableCell>
            <TableCell>{row.branchName}</TableCell>
            <TableCell>{row.customersCount}</TableCell>
            <TableCell>{row.chairPrice}</TableCell>
            <TableCell>
              <TourStatusColored tourStatus={row.tourStatus} />
            </TableCell>
            <TableCell>
              <ButtonsStack>
                <ShowIconButton onClick={() => details(row.id)} />
                <ReservationButton id={row.id} />
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default ToursTable;
