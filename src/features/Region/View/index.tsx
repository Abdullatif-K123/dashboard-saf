import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CitySelect } from "API/city/type";
import { CountrySelect } from "API/country/type";
import regionQueries from "API/region/queries";
import EditIconButton from "components/buttons/EditIconButton";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import useObjectSearchParam from "hooks/useObjectSearchParam";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import useTableHeader from "./useTableHeader";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";
type Props = {};
const RegionTable: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  const countryId = useObjectSearchParam<CountrySelect>("country")?.id ?? "";
  const cityId = useObjectSearchParam<CitySelect>("city")?.id ?? "";

  const { edit, remove } = useEventSearchParams();
  const infiniteQuery = regionQueries.useInfiniteQuery({
    query,
    pageNumber,
    cityId,
    countryId,
  });
  const { data } = infiniteQuery;
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);
  const { hasDeletePermission, hasEditPermission } = useRoleContext();
  const permissionName = PermissionName.Region;
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
            <TableCell width={"35%"}>{row.regionName}</TableCell>
            <TableCell>{row.cityName}</TableCell>
            <TableCell>{row.countryName}</TableCell>
            <TableCell width="20%">
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

export default RegionTable;
