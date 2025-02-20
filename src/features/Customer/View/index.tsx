import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import customerQueries from "API/customer/queries";
import { Customer } from "API/customer/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import LTR from "components/layout/LTR";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import GenderText from "components/typography/GenderText";
import { RecordType } from "constants/enums";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { Dispatch, FC, SetStateAction } from "react";
import { getPage } from "utils/apiHelpers";
import { creationDateFormat } from "utils/transforms";
import useTableHeader from "./useTableHeader";
import ChangeRecordButton from "features/Customer/View/ChangeRecordButton";
import useNumberEnumSearchParam from "hooks/useNumberEnumSearchParam";
import { PageSize } from "types/api";
type Props = {
  setToChangeRecord: Dispatch<SetStateAction<Customer | null>>;
};
const CustomersTable: FC<Props> = ({ setToChangeRecord }) => {
  const pageNumber = usePageNumberSearchParam();
  const query = useQuerySearchParam();
  const recordTypeParam = useQuerySearchParam("recordType");
  const recordType = recordTypeParam
    ? (Number(recordTypeParam) as RecordType)
    : null;
  const pageSize = useNumberEnumSearchParam<PageSize>("ps") ?? null;

  const infiniteQuery = customerQueries.useInfiniteQuery({
    query,
    recordType,
    pageNumber,
    pageSize,
  });
  const { data } = infiniteQuery;
  const { details } = useEventSearchParams();
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
            <TableCell>
              <LTR>{row.phoneNumber}</LTR>
            </TableCell>
            <TableCell>{<GenderText gender={row.gender} />}</TableCell>
            <TableCell>{row.toursCount}</TableCell>
            <TableCell>
              <LTR>{creationDateFormat(row.creationDate)}</LTR>
            </TableCell>
            <TableCell sx={{ width: 0 }}>
              <ChangeRecordButton
                onClick={() => setToChangeRecord(row)}
                type={row.recordType}
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

export default CustomersTable;
