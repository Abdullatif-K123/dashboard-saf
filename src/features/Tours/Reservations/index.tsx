import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useQueryClient } from "@tanstack/react-query";
import tourQueries from "API/tour/queries";
import { TourCustomer } from "API/tour/type";
import SearchInput from "components/Inputs/SearchInput";
import AddFab from "components/buttons/AddFab";
import Submit from "components/buttons/Submit";
import Skeleton from "components/feedback/Skeleton";
import FilterRow from "components/layout/FilterRow";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import Action from "./Action";
import { CustomerRow } from "./CustomerRow";
import useTableHeader from "./useTableHeader";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
import RepeatELement from "components/layout/RepeatElement";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import Loading from "components/feedback/Loading";
import NoData from "components/feedback/NoData";
type Props = {};
//TODO refactor
const TourCustomersTable: FC<Props> = ({}) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [toCancel, setToCancel] = useState<string[]>([]);
  const [toEdit, setToEdit] = useState<TourCustomer | null>(null);
  const [openAction, setOpenAction] = useState(false);
  const { id: tourId = "" } = useParams();
  const query = useQuerySearchParam();
  const { t } = useTranslation(undefined, { keyPrefix: "tour.reservation" });
  const pageNumber = usePageNumberSearchParam();
  const infiniteQuery = tourQueries.useCustomers({
    tourId,
    query,
    pageNumber,
  });

  const tableHeaders = useTableHeader();
  const { data } = infiniteQuery;

  const isLoading = infiniteQuery.isLoading;
  const isSuccess = infiniteQuery.isSuccess;
  const page: TourCustomer[] | undefined = data?.pages?.[0]?.data?.data as
    | TourCustomer[]
    | undefined;

  console.log(data?.pages?.[0]?.data?.data);
  const isEmpty = isSuccess && !page?.length;
  const cancelReservations = tourQueries.useUnBook();
  const queryClient = useQueryClient();
  const snackbar = useAxiosErrorSnackbar();

  // check permissions
  const permissionName = PermissionName.TourBooking;

  const { hasAddPermission, hasPermission, hasDeletePermission } =
    useRoleContext();

  // if (!hasPermission(permissionName)) {
  //   return <Navigate to="/403" />;
  // }

  const handleReservationCancel = () => {
    if (toCancel.length !== 0) {
      cancelReservations.mutate(
        { body: toCancel },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([controllers.TOUR, "reservations"]);
            setIsCanceling(false);
            setToCancel([]);
          },
          onError: snackbar,
        }
      );
    } else if (toCancel.length == 0) {
      setIsCanceling((prev) => !prev);
    }
  };
  const handleRowCancel = (chairNumber: string) => {
    setToCancel((toCancel) => {
      const result = [...toCancel];
      if (!result.includes(chairNumber)) {
        result.push(chairNumber);
      } else {
        result.splice(
          result.findIndex((value) => chairNumber === value),
          1
        );
      }
      return result;
    });
  };
  return (
    <Stack>
      {infiniteQuery.isInitialLoading && (
        <Skeleton widthRange={{ min: 160, max: 200 }} height={40} />
      )}
      {infiniteQuery.isSuccess && page?.[0]?.tourName && (
        <Typography variant="h4" color="primary">
          {page[0].tourName}
        </Typography>
      )}
      <FilterRow py={1}>
        {/* {hasDeletePermission(permissionName) && (
          <Grid item justifySelf={"end"}>
            <Submit
              isSubmitting={cancelReservations.isLoading}
              type="button"
              size="small"
              loadingSize={13}
              sx={{ fontSize: 15 }}
              onClick={handleReservationCancel}
            >
              {t(
                isCanceling
                  ? toCancel.length === 0
                    ? "stopCanceling"
                    : "saveCanceling"
                  : "startCanceling"
              )}
            </Submit>
          </Grid>
        )} */}
        <Grid item>
          <SearchInput />
        </Grid>
      </FilterRow>
      <Paper
        sx={{
          borderRadius: 2,
          mb: "48px !important",
          overflow: "hidden",
        }}
      >
        <Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[null, ...tableHeaders].map((cellHeader) => (
                    <TableCell key={cellHeader}>{cellHeader}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading && (
                <RepeatELement repeat={10} container={<TableBody />}>
                  <RepeatELement repeat={15} container={<TableRowStriped />}>
                    <TableCell>
                      <Skeleton height={30} sx={{ m: "auto" }} />
                    </TableCell>
                  </RepeatELement>
                </RepeatELement>
              )}
              {page && (
                <TableBody>
                  {page &&
                    page.map((row: TourCustomer) => (
                      <CustomerRow
                        onEditClick={() => {
                          setToEdit(row);
                          setOpenAction(true);
                        }}
                        data={row}
                        onCancelChange={handleRowCancel}
                        key={row.tourCustomerChairId}
                        isCancelingActive={isCanceling}
                      />
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <Box sx={{ mx: "auto", my: 1, width: "min(90% ,300px)" }}>
            {isLoading && <Loading />}
            {!page && !isLoading && <NoData />}
            {isEmpty && <NoData />}
          </Box>
        </Stack>
      </Paper>
      <Action
        tourId={tourId}
        data={toEdit}
        key={String(openAction)}
        open={openAction}
        setOpen={setOpenAction}
        onClose={() => setToEdit(null)}
      />
      {/* {hasAddPermission(permissionName) && (
        <AddFab onClick={() => setOpenAction(true)} />
      )} */}
    </Stack>
  );
};

export default TourCustomersTable;
