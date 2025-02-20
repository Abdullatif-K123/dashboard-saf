import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { BranchSelect } from "API/branch/type";
import homeQueries from "API/home/queries";
import { HomeToursBranchChart } from "API/home/type";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import BranchFilterAutocomplete from "components/filters/BranchFilterAutocomplete";
import DateFilter from "components/filters/DateFilter";
import themeConstants from "constants/themeConstants";
import dayjs from "dayjs";
import useObjectSearchParam from "hooks/useObjectSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { PropsType } from "types/utils";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);
export type TourStatsProps = { initialChart: HomeToursBranchChart[] };
export const TourStats: FC<TourStatsProps> = ({ initialChart }) => {
  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id ?? "";
  const from = useQuerySearchParam("from") ?? "";
  const to = useQuerySearchParam("to") ?? "";
  const isFilterEnabled = !!(branchId || from || to);
  const query = homeQueries.useChart({ branchId, from, to });
  return (
    <Chart
      dataset={isFilterEnabled ? query.data ?? [] : initialChart}
      isLoading={query.isLoading && isFilterEnabled}
    />
  );
};
type ChartProps = { dataset: HomeToursBranchChart[]; isLoading: boolean };
const Chart: FC<ChartProps> = ({ dataset, isLoading }) => {
  const { data, options } = useMemo(() => {
    const data: PropsType<typeof Line>["data"] = {
      labels: dataset.map((data) => dayjs(data.date).format("MM/DD")),
      datasets: [
        {
          tension: 0.25,
          pointRadius: 1,
          label: "",
          data: dataset.map((data) => data.tourCount),
          borderColor: themeConstants.primary,
          backgroundColor: themeConstants.primary9,
        },
      ],
    };
    let min = dataset[0]?.tourCount ?? 1;
    let max = dataset[0]?.tourCount ?? 0;
    for (let i = 0; i < dataset.length; i++) {
      if (dataset[i].tourCount > max) max = dataset[i].tourCount;
      if (dataset[i].tourCount < min) min = dataset[i].tourCount;
    }
    const options: PropsType<typeof Line>["options"] = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
        },
        y: {
          min: Math.max(0, min - 1),
          max: max + 1,
          ticks: {
            callback: function (value) {
              if (typeof value === "number" && Math.floor(value) === value) {
                return value.toString();
              }
            },
          },
        },
      },
      plugins: {
        tooltip: {
          intersect: false,
          mode: "index",
        },
        legend: {
          display: false,
        },
      },
    };
    return { data, options };
  }, [dataset]);
  const { t } = useTranslation();
  return (
    <Paper sx={{ py: 3, px: 2 }}>
      <Stack gap={1}>
        <Grid
          container
          sx={{ pr: { xs: 2, lg: 10 } }}
          spacing={1}
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid
            item
            xs={12}
            lg={5}
            flexDirection="row"
            justifyContent={"space-between"}
            gap={1}
            display={"flex"}
          >
            <Typography
              variant="h5"
              sx={{ color: "primary.900", width: "25%", display: "flex", alignItems: "center" }}
            >
              {t("home.stats.title")}
            </Typography>
            <Box sx={{ minWidth: { xs: 200, md: 300 } }}>
              <BranchFilterAutocomplete label={t("home.stats.branch")} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            flexDirection="row"
            display={"flex"}
            alignItems={"center"}
            gap={1}
            color="#4B465C"
          >
            {t("generic.from")}
            <DateFilter name="from" label="" />
            {t("generic.to")}
            <DateFilter name="to" label="" />
          </Grid>
        </Grid>
        <Box height={400} sx={{ opacity: isLoading ? 0.5 : 1 }}>
          <Line options={options} data={data} />
        </Box>
      </Stack>
    </Paper>
  );
};
