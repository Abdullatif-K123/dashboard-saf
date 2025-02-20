import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import { Bus, BusDetails, BusGetAllBody, BusGetAllParams } from "./type";

const getAll = async (params: BusGetAllParams, body: BusGetAllBody) => {
  const { data } = await axiosInstance.put<Pagination<Bus>>(API_ROUTES.BUS.GET_ALL, body, {
    params,
  });
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<BusDetails>(API_ROUTES.BUS.GET, {
    params: { id },
  });
  return data;
};
const busAPI = {
  getAll,
  get,
};

export default busAPI;
