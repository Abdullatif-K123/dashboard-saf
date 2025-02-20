import { useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import homeAPI from "./api";
import { HomeTourChartParams } from "./type";
const homeQueries = {
  useHome: () => useQuery([controllers.HOME, "all"], () => homeAPI.getHomeData()),
  useChart: (params: HomeTourChartParams) =>
    useQuery([controllers.HOME, "chart", { ...params }], () => homeAPI.getTourChart(params), {
      enabled: !!(params.branchId || params.to || params.from),
    }),

  usePendingCount: () =>
    useQuery([controllers.HOME, "pendingCounts"], {
      staleTime: Infinity,
      queryFn: homeAPI.getCounts,
    }),
};
export default homeQueries;
