import API_ROUTES from "../../constants/apiRoutes";
import axiosInstance from "../axios";
import { HomeData, HomeTourChartParams, HomeToursBranchChart, PendingCounts } from "./type";

const getHomeData = async () => {
  const { data } = await axiosInstance.get<HomeData>(API_ROUTES.HOME.GET);
  return data;
};

const getTourChart = async (params: HomeTourChartParams) => {
  const { data } = await axiosInstance.get<HomeToursBranchChart[]>(API_ROUTES.HOME.TOUR_CHART, {
    params,
  });
  return data;
};
const getCounts = async () => {
  const { data } = await axiosInstance.get<PendingCounts>(API_ROUTES.BRANCH.PENDING_COUNTS);
  return data;
};
const homeAPI = { getHomeData, getTourChart, getCounts };

export default homeAPI;
