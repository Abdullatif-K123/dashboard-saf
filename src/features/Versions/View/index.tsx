import { FC } from "react";
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import useTableHeader from "./useTableHeader";
import versionQueries from "API/version/queries";
import ButtonsStack from "components/layout/ButtonsStack";
import ShowIconButton from "components/buttons/ShowIconButton";
import RepeatELement from "components/layout/RepeatElement";
import Loading from "components/feedback/Loading";
import NoData from "components/feedback/NoData";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import EditIconButton from "components/buttons/EditIconButton";
type Props = {};
const VersionTable: FC<Props> = ({}) => {
  const { details, remove, edit } = useEventSearchParams();
  const { data, isLoading, isSuccess } = versionQueries.useVersionGetAll();

  const isEmpty = isSuccess && !data;
  console.log(data);
  const tableHeader = useTableHeader();
  return (
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
                {[...tableHeader].map((cellHeader) => (
                  <TableCell align="center" key={cellHeader}>
                    {cellHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading && (
              <RepeatELement repeat={3} container={<TableBody />}>
                <RepeatELement repeat={3} container={<TableRowStriped />}>
                  <TableCell>
                    <Skeleton height={3} sx={{ m: "auto" }} />
                  </TableCell>
                </RepeatELement>
              </RepeatELement>
            )}

            {Array.isArray(data) &&
              data.map((row) => (
                <TableRowStriped key={row.id}>
                  <TableCell align="center">{row.currentVersion}</TableCell>
                  <TableCell align="center">{row.minimumVersion}</TableCell>
                  <TableCell align="right">
                    <ButtonsStack>
                      <ShowIconButton onClick={() => details(row.id)} />
                      <RemoveIconButton onClick={() => remove(row.id)} />
                      <EditIconButton
                        onClick={() => {
                          edit(row.id);
                        }}
                      />
                    </ButtonsStack>
                  </TableCell>
                </TableRowStriped>
              ))}
          </Table>
        </TableContainer>
        <Box sx={{ mx: "auto", my: 1, width: "min(90% ,300px)" }}>
          {isLoading && <Loading />}
          {!data && !isLoading && <NoData />}
          {isEmpty && <NoData />}
        </Box>
      </Stack>
    </Paper>
  );
};

export default VersionTable;
