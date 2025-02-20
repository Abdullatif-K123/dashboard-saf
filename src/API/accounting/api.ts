import {
  AccountingBody,
  AccountingDetails,
  AccountingDetailsParams,
  AccountingGet,
  AccountingParams,
} from "API/accounting/type";
import API_ROUTES from "../../constants/apiRoutes";
import axiosInstance from "../axios";
import { Pagination } from "types/api";

const getAll = async (params: AccountingParams, body: AccountingBody) => {
   
  const { data } = await axiosInstance.put<Pagination<AccountingGet>>(
    API_ROUTES.ACCOUNTING.GET_ALL,
    body,
    {
      params,
    }
  );
  return data;
};
const getAllCash = async (params: AccountingParams, body: AccountingBody)=>{
    console.log( API_ROUTES.ACCOUNTING.GET_ALL_CASH) 
  const {data} = await axiosInstance.put<Pagination<AccountingGet>>(
     API_ROUTES.ACCOUNTING.GET_ALL_CASH, 
     body,{
       params
     }
   );
   console.log(data)
   return data
}
const getDetails = async (params: AccountingDetailsParams) => {
  const { data } = await axiosInstance.get<Pagination<AccountingDetails>>(
    API_ROUTES.ACCOUNTING.GET,
    { params }
  );
  return data;
};

const action = async (ids: string[]) => {
  const { data } = await axiosInstance.put(API_ROUTES.ACCOUNTING.ACTION, ids);
  return data;
};

const accountingAPI = {
  getAll,
  getAllCash,
  getDetails,
  action,
};

export default accountingAPI;
