import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import branchQueries from "API/branch/queries";
import { Branch } from "API/branch/type";
import { OwnerSelect } from "API/owner/type";
import { RegionSelect } from "API/region/type";
import RemoveIconButton from "components/buttons/RemoveIconButton";
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
import { useSearchParams } from "react-router-dom";
import { getPage } from "utils/apiHelpers";
import { creationDateFormat } from "utils/transforms";
import useTableHeader from "./useTableHeader";
import ChangeRecordButton from "features/Branch/View/ChangeRecordButton";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
type Props = {
  setToChangeRecord: React.Dispatch<React.SetStateAction<Branch | null>>;
};
const BranchesTable: FC<Props> = ({ setToChangeRecord }) => {
  const [searchParams] = useSearchParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const ownerId = useObjectSearchParam<OwnerSelect>("owner")?.id ?? null;
  const regionId = useObjectSearchParam<RegionSelect>("region")?.id ?? null;
  const { hasDeletePermission } = useRoleContext();

  const recordTypeString = searchParams.get("recordType");
  const recordType = recordTypeString ? Number(recordTypeString) : null;

  const { remove, details: show } = useEventSearchParams();
  const infiniteQuery = branchQueries.useInfiniteQuery(
    {
      query,
      pageNumber,
    },
    { ownerId, recordType, regionId }
  );

  const { data } = infiniteQuery;
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);

  return (
    <PaginationTable
      pageNumber={pageNumber}
      infiniteQuery={infiniteQuery}
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
    >
      <TableBody>
        {page.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <LTR>{row.phoneNumber}</LTR>
            </TableCell>
            <TableCell>
              <LTR>{row.landLineNumber ?? "-"}</LTR>
            </TableCell>
            <TableCell>{`${row.city} - ${row.region}`}</TableCell>
            <TableCell>{row.owner}</TableCell>
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
                <ShowIconButton onClick={() => show(row.id)} />
                {hasDeletePermission(PermissionName.Branch) && (
                  <RemoveIconButton onClick={() => remove(row.id)} />
                )}
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default BranchesTable;
