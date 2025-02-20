import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import {
  Owner,
  OwnerDetails,
  OwnerGetAllParams,
  OwnerSelect,
  OwnerUpdateRecordTypeBody,
} from "./type";

const getAll = async (params: OwnerGetAllParams) => {
  const { data } = await axiosInstance.get<Pagination<Owner>>(API_ROUTES.OWNER.GET_ALL, {
    params,
  });
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<OwnerDetails>(API_ROUTES.OWNER.GET, {
    params: { id },
  });
  return data;
};
const getSelect = async () => {
  const { data } = await axiosInstance.get<OwnerSelect[]>(API_ROUTES.OWNER.GET_SELECT, {});
  return data;
};
const toggleBlock = async (ownerId: string) => {
  await axiosInstance.post(API_ROUTES.OWNER.CHANGE_IS_BLOCKED, null, {
    params: { ownerId },
  });
};
const changeRecordType = async (body: OwnerUpdateRecordTypeBody) => {
  await axiosInstance.post(API_ROUTES.OWNER.CHANGE_RECORD_TYPE, body);
};
const ownerAPI = {
  getAll,
  get,
  toggleBlock,
  getSelect,
  changeRecordType,
};

export default ownerAPI;
