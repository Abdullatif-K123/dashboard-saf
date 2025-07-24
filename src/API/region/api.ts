import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import {
  Region,
  RegionActionBody,
  RegionDetails,
  RegionGetAllNpParams,
  RegionGetAllParams,
} from "./type";
const getAll = async (params: RegionGetAllParams) => {
  console.log(params);
  const { data } = await axiosInstance.get<Pagination<Region>>(
    API_ROUTES.REGION.GET_ALL,
    {
      ...(params.cityId && params.countryId && { params }),
    }
  );
  return data;
};
const getAllNp = async (params: RegionGetAllNpParams) => {
  const { data } = await axiosInstance.get<Region[]>(
    API_ROUTES.REGION.GET_SELECT,
    {
      params,
    }
  );
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<RegionDetails>(
    API_ROUTES.REGION.GET,
    {
      params: { id },
    }
  );
  return data;
};
const action = async (body: RegionActionBody) => {
  await axiosInstance.post(API_ROUTES.REGION.ACTION, body);
};

const remove = async (regionId: string) => {
  await axiosInstance.delete(API_ROUTES.REGION.REMOVE, {
    params: { regionId },
  });
};
const regionAPI = {
  getAll,
  getAllNp,
  get,
  action,
  remove,
};

export default regionAPI;
