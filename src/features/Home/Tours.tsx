import { Alert, Box, Button, Fade, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HomeTour } from "API/home/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import { useLoadingContext } from "context/loadingContext";
import Timeago from "lib/Timeago";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DateFormatter } from "utils/transforms";
import { Head } from "./Head";
import { List } from "./List";
import { Paper } from "./Paper";
import { Row } from "./Row";
import { SkeletonRows } from "./SkeletonRows";
import { Title } from "./Title";
import { FinishedTourIcon, TimelineIcon } from "./icons";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
export type ToursProps = {
  data: { ongoing: HomeTour[]; upcoming: HomeTour[]; finished: HomeTour[] };
};
export const Tours: FC<ToursProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<keyof typeof data>("upcoming");
  const { t } = useTranslation(undefined, { keyPrefix: "home.tour" });
  const { hasPermission } = useRoleContext();
  const { t: tTourStatus } = useTranslation(undefined, {
    keyPrefix: "enum.TourStatus",
  });
  const currentTab = data[activeTab];
  const isEmpty = data[activeTab].length === 0;
  const navigate = useNavigate();
  const isLoading = useLoadingContext();
  const hasViewPermission = hasPermission(PermissionName.Tour);
  const headTitles = [t("name"), t("branchName"), t("time")];
  if (hasViewPermission) headTitles.push(t("more"));
  return (
    <Paper>
      <Stack sx={{ height: 110 }}>
        <Title>{t("title")}</Title>
        <Stack
          direction="row"
          justifyContent={"center"}
          my={1}
          sx={{
            gap: 4,
            ".MuiButton-root": {
              px: 1,
              py: 0.5,
              ".MuiTouchRipple-root": { color: "secondary.main" },
              borderRadius: 3,
              border: "2px dashed #4B465C2c",
              "&.active": {
                border: (th) => `2px solid ${th.palette.secondary.main}`,
                ".fill": { fill: (th) => th.palette.secondary.main },
                ".stroke": { stroke: (th) => th.palette.secondary.main },
              },
            },
          }}
        >
          <Button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
            startIcon={<FinishedTourIcon />}
          >
            {tTourStatus("UpComing")}
          </Button>
          <Button
            className={activeTab == "ongoing" ? "active" : ""}
            onClick={() => setActiveTab("ongoing")}
            startIcon={<FinishedTourIcon />}
          >
            {tTourStatus("Ongoing")}
          </Button>
          <Button
            className={activeTab == "finished" ? "active" : ""}
            onClick={() => setActiveTab("finished")}
            startIcon={<FinishedTourIcon />}
          >
            {tTourStatus("Finished")}
          </Button>
        </Stack>
      </Stack>
      <Head>
        {headTitles.map((col) => (
          <Typography key={col}>{col}</Typography>
        ))}
      </Head>
      <List>
        {!isEmpty &&
          !isLoading &&
          currentTab.map((tour, tourIndex) => (
            <Fade key={tour.id} in={true} timeout={tourIndex * 200 + 500}>
              <Row>
                <Box>{tour.name}</Box>
                <Box>
                  <Box
                    sx={{
                      bgcolor: "#28C76F29",
                      mx: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: 0.25,
                      borderRadius: 1,
                      width: 70,
                      color: "primary.900",
                      minWidth: "fit-content",
                    }}
                  >
                    {tour.branchName}
                  </Box>
                </Box>
                <Tooltip
                  placement="top"
                  slotProps={{ tooltip: { sx: { borderRadius: "21px" } } }}
                  title={
                    <Stack direction="row" gap={1} pt={1}>
                      <Box sx={{ svg: { height: 70 } }}>
                        <TimelineIcon />
                      </Box>
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        pb={0.5}
                      >
                        <Typography fontSize={12}>
                          <Box component="span" pr={1}>
                            {t("leaveDate")}
                          </Box>
                          {DateFormatter(tour.leaveDate, { withTime: true })}
                        </Typography>
                        <Typography fontSize={12}>
                          <Box component="span" pr={1}>
                            {t("arriveDate")}
                          </Box>

                          {DateFormatter(tour.arriveDate, { withTime: true })}
                        </Typography>
                      </Stack>
                    </Stack>
                  }
                >
                  <Box>
                    <Timeago date={tour.leaveDate} title={""} />
                  </Box>
                </Tooltip>
                {hasViewPermission && (
                  <Box>
                    <ShowIconButton
                      onClick={() =>
                        navigate(`/tours?id=${tour.id}&mode=details`)
                      }
                    />
                  </Box>
                )}
              </Row>
            </Fade>
          ))}
        {isLoading && <SkeletonRows fadeOffset={500} />}
        {isEmpty && !isLoading && (
          <Alert severity="info" sx={{ m: 2, borderRadius: 4 }}>
            {t("noData")}
          </Alert>
        )}
      </List>
    </Paper>
  );
};
export default Tours;
