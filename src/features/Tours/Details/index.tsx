import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DividedStack, { DividedStackProps } from "components/layout/DividedStack";
import LabelValue from "components/typography/LabelValue";

import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import tourQueries from "API/tour/queries";
import NoData from "components/feedback/NoData";
import Skeleton from "components/feedback/Skeleton";
import DialogTitle from "components/forms/DialogTitle";
import RepeatELement from "components/layout/RepeatElement";
import Table from "components/tables/TableWithAlign";
import { LoadingProvider } from "context/loadingContext";
import useDetailsSearchParams from "hooks/useDetailsSearchParams";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DateFormatter } from "utils/transforms";
import TourStatusColored from "../TourStatusColored";
type Props = {};
const dividedStackProps: DividedStackProps = {
  flexWrap: "wrap",
  gap: 3,
  sx: {
    "&>* ": {
      flexBasis: { xs: "100%", md: "31%" },
      flexGrow: 1,
    },

    "& * *": {
      justifyContent: "start",
      alignItems: "center",
    },
  },
  direction: "row",
};
const TourDetails: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "tour.details" });
  const { id, isActive, clearDetailsParams } = useDetailsSearchParams();
  const { data, isInitialLoading, isSuccess, isError } = tourQueries.useDetailsQuery(id);
  const handleClose = () => {
    clearDetailsParams();
  };
  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"lg"}>
      <DialogTitle onClose={handleClose} fontSize={30} color="primary">
        {t("title")}
      </DialogTitle>
      <DialogContent>
        {(isSuccess || isInitialLoading) && (
          <LoadingProvider value={isInitialLoading}>
            <DividedStack {...dividedStackProps}>
              <LabelValue label={t("name")}>{data?.name}</LabelValue>
              <LabelValue label={t("chairPrice")}>{data?.chairPrice}</LabelValue>
              <LabelValue label={t("tourStatus")}>
                <TourStatusColored tourStatus={data?.tourStatus ?? 0} />
              </LabelValue>
              <LabelValue label={t("branchName")}>{data?.branchName}</LabelValue>
              <LabelValue label={t("busName")}>{data?.busName}</LabelValue>
              <LabelValue label={t("driverName")}>{data?.driverName}</LabelValue>
              <LabelValue label={t("driverphoneNumber")}>{data?.driverphoneNumber}</LabelValue>
              <LabelValue label={t("anotherDriverphoneNumber")}>
                {data?.anotherDriverphoneNumber}
              </LabelValue>
              <LabelValue label={t("coDriverName")}>{data?.coDriverName}</LabelValue>
              <LabelValue label={t("coDriverPhoneNumber")}>{data?.coDriverPhoneNumber}</LabelValue>
              <LabelValue label={t("anotherCoDriverPhoneNumber")}>
                {data?.anotherCoDriverPhoneNumber}
              </LabelValue>
              <LabelValue label={t("leaveDate")}>
                {DateFormatter(data?.leaveDate, { withTime: true })}
              </LabelValue>
              <LabelValue label={t("arriveDate")}>
                {DateFormatter(data?.arriveDate, { withTime: true })}
              </LabelValue>
            </DividedStack>
            <Paper
              className="cities"
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                width: { xs: "100%", md: "50%" },
                mx: "auto",
                mt: 3,
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("tourCities.cityName")}</TableCell>
                      <TableCell>{t("tourCities.time")}</TableCell>
                      <TableCell>{t("tourCities.breakTime")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      "*": { color: "primary.main" },
                    }}
                  >
                    {isSuccess &&
                      data.tourCities.map((city, i) => (
                        <TableRow key={city.id}>
                          <TableCell>{city.cityName}</TableCell>
                          <TableCell>
                            {city.time !== null && DateFormatter(city.time, { withTime: true })}
                            {(i === 0 || i === data.tourCities.length - 1) &&
                              city.time === null &&
                              DateFormatter(i === 0 ? data.leaveDate : data.arriveDate, {
                                withTime: true,
                              })}
                            {i > 0 && i < data.tourCities.length - 1 && city.time === null && " - "}
                          </TableCell>
                          <TableCell>{city.breakTime || t("tourCities.noBreak")}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  {isInitialLoading && (
                    <RepeatELement repeat={3} container={<TableBody />}>
                      <RepeatELement repeat={3} container={<TableRow />}>
                        <TableCell>
                          <Skeleton widthRange={{ min: 20, max: 30 }} sx={{ m: "auto" }} />
                        </TableCell>
                      </RepeatELement>
                    </RepeatELement>
                  )}
                </Table>
              </TableContainer>
            </Paper>
          </LoadingProvider>
        )}
        {isError && <NoData />}
      </DialogContent>
    </Dialog>
  );
};
export default TourDetails;
