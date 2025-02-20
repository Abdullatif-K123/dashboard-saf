import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ownerQueries from "API/owner/queries";
import { Owner } from "API/owner/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import LTR from "components/layout/LTR";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import { RecordType } from "constants/enums";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { Dispatch, FC, SetStateAction } from "react";
import { getPage } from "utils/apiHelpers";
import { creationDateFormat } from "utils/transforms";
import useTableHeader from "./useTableHeader";
import ChangeRecordButton from "features/Owner/View/ChangeRecordButton";
type Props = {
  setToChangeRecord: Dispatch<SetStateAction<Owner | null>>;
};
const OwnersTable: FC<Props> = ({ setToChangeRecord }) => {
  const pageNumber = usePageNumberSearchParam();
  const recordTypeParam = useQuerySearchParam("recordType");
  const recordType = recordTypeParam
    ? (Number(recordTypeParam) as RecordType)
    : null;
  const query = useQuerySearchParam();
  const infiniteQuery = ownerQueries.useInfiniteQuery({
    query,
    pageNumber,
    recordType,
  });
  const { details } = useEventSearchParams();
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
            <TableCell>{row.branchesNumber}</TableCell>
            <TableCell>
              <LTR>{row.phoneNumber}</LTR>
            </TableCell>
            <TableCell>
              <LTR>{creationDateFormat(row.creationDate)}</LTR>
            </TableCell>
            <TableCell sx={{ width: 0 }}>
              <ChangeRecordButton
                type={row.recordType}
                onClick={() => setToChangeRecord(row)}
              />
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

export default OwnersTable;
