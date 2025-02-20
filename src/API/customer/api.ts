import API_ROUTES from "constants/apiRoutes";
import { Pagination } from "types/api";
import axiosInstance from "../axios";
import {
  Customer,
  CustomerDetails,
  CustomerGetAllParams,
  CustomerUpdateRecordTypeBody,
} from "./type";

const getAll = async (params: CustomerGetAllParams) => {
  const { data } = await axiosInstance.get<Pagination<Customer>>(
    API_ROUTES.CUSTOMER.GET_ALL,
    {
      params,
    }
  );
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<CustomerDetails>(
    API_ROUTES.CUSTOMER.GET,
    {
      params: { id },
    }
  );
  return data;
};
const toggleBlock = async (customerId: string) => {
  await axiosInstance.post(API_ROUTES.CUSTOMER.CHANGE_IS_BLOCKED, null, {
    params: { customerId },
  });
};
const changeRecordType = async (body: CustomerUpdateRecordTypeBody) => {
  await axiosInstance.post(API_ROUTES.CUSTOMER.CHANGE_RECORD_TYPE, body);
};

const getDownload = async (params: CustomerGetAllParams) => {
  const res = await axiosInstance.put(API_ROUTES.CUSTOMER.DOWNLOAD_FILE, null, {
    params,
    responseType: "blob",
  });

  if (res !== undefined && res !== null) {
    if (res.headers !== null && res.headers !== undefined) {
      console.log(
        res.headers,
        res.headers["content-disposition"],
        res.headers["content-type"]
      );
    }
  }
  return res;
};

const customerAPI = {
  getAll,
  get,
  changeRecordType,
  toggleBlock,
  getDownload,
};

export default customerAPI;
