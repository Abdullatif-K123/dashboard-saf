import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import {
  Branch,
  BranchChangeRecordParams,
  BranchDetails,
  BranchGetAllBody,
  BranchGetAllParams,
  BranchSelect,
  BranchSelectParams,
} from "./type";

const getAll = async (params: BranchGetAllParams, body: BranchGetAllBody) => {
  const { data } = await axiosInstance.put<Pagination<Branch>>(API_ROUTES.BRANCH.GET_ALL, body, {
    params,
  });
  return data;
};
const getSelect = async (params: BranchSelectParams) => {
  const { data } = await axiosInstance.put<BranchSelect[]>(API_ROUTES.BRANCH.GET_SELECT, null, {
    params,
  });
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<BranchDetails>(API_ROUTES.BRANCH.GET, {
    params: { id },
  });
  return data;
};
const changeRecord = async (params: BranchChangeRecordParams) => {
  await axiosInstance.post(API_ROUTES.BRANCH.CHANCE_RECORD_TYPE, null, { params });
};
const remove = async (branchId: string) => {
  await axiosInstance.delete(API_ROUTES.BRANCH.REMOVE, { params: { branchId } });
};
const branchAPI = { get, getAll, getSelect, changeRecord, remove };

export default branchAPI;
