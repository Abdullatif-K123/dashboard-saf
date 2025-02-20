import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack, TableHead, TableRow } from "@mui/material";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import accountingQueries from "API/accounting/queries";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import usePageParams from "../hooks/usePageParams";
import usePageBody from "features/Accounting/hooks/usePageBody";
import useTableHeader from "features/Accounting/hooks/useTableHeader";
import { getPage } from "utils/apiHelpers";
import LTR from "components/layout/LTR";
import { moneyFormatter } from "utils/transforms";
import RowActions from "features/Accounting/AccountingTable/RowActions";
import ToggleTourSelectionButton from "features/Accounting/AccountingTable/ToggleTourSelectionButton";

const AccountingTableCash = () => {
  const params = usePageParams();
  const body = usePageBody();
  const infiniteQuery = accountingQueries.useInfiniteQueryCash(params, body);
  const { data } = infiniteQuery;
  console.log("we are here in cash", data);
  const tableHeaders = useTableHeader();

  const page = getPage(data, params.pageNumber ?? 0);
  return (
    <PaginationTable
      skeleton={true}
      cellCount={tableHeaders.length + 1}
      tableHead={
        <TableHead>
          <TableRow>
            {[null, ...tableHeaders].map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      pageNumber={params.pageNumber ?? 0}
      infiniteQuery={infiniteQuery}
    >
      <TableBody>
        {page.map((row) => (
          <TableRowStriped key={row.tourId}>
            <ToggleTourSelectionButton
              disabled={row.isCompanyConfirm}
              id={row.tourId}
            />
            <TableCell>{row.tourName}</TableCell>
            <TableCell>{row.branchName}</TableCell>
            <TableCell>
              <LTR>{dayjs(row.tourLeaveDate).format("YYYY/MM/DD hh:mm")}</LTR>
            </TableCell>
            <TableCell>
              <LTR>{dayjs(row.tourArriveDate).format("YYYY/MM/DD hh:mm")}</LTR>
            </TableCell>
            <TableCell>{moneyFormatter.format(row.companyPrice)}</TableCell>
            <TableCell>{moneyFormatter.format(row.ownerPrice)}</TableCell>
            <TableCell>
              <Stack sx={{ alignItems: "center" }}>
                {row.isCompanyConfirm ? (
                  <CheckIcon />
                ) : (
                  <ClearIcon sx={{ color: "secondary.main" }} />
                )}
              </Stack>
            </TableCell>
            <TableCell>
              <Stack sx={{ alignItems: "center" }}>
                {row.isOwnerConfirm ? (
                  <CheckIcon />
                ) : (
                  <ClearIcon sx={{ color: "secondary.main" }} />
                )}
              </Stack>
            </TableCell>
            <TableCell>
              <RowActions row={row} />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default AccountingTableCash;
