import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import { Model, ModelActionBody, ModelDetails, ModelGetAllParams } from "./type";

const getAll = async (params: ModelGetAllParams) => {
  const { data } = await axiosInstance.get<Pagination<Model>>(API_ROUTES.MODEL.GET_ALL, {
    params,
  });
  return data;
};
const get = async (modelId: string) => {
  const { data } = await axiosInstance.get<ModelDetails>(API_ROUTES.MODEL.GET_DETAILS, {
    params: { modelId },
  });
  return data;
};
const action = async (body: ModelActionBody) => {
  await axiosInstance.post(API_ROUTES.MODEL.ACTION, body);
};
const remove = async (modelId: string) => {
  await axiosInstance.delete(API_ROUTES.MODEL.REMOVE, { params: { modelId } });
};
const modelAPI = {
  getAll,
  get,
  action,
  remove,
};

export default modelAPI;
