import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import {
  Account,
  AccountActionBody,
  AccountActionBodyNext,
  AccountDetails,
  AccountGetAllParams,
  AccountLoginBody,
  loginToken,
} from "./type";

const getAll = async (params: AccountGetAllParams) => {
  const { data } = await axiosInstance.get<Pagination<Account>>(
    API_ROUTES.ACCOUNT.GET_ALL,
    {
      params,
    }
  );
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<AccountDetails>(
    API_ROUTES.ACCOUNT.GET,
    {
      params: { id },
    }
  );
  return data;
};
const action = async (body: AccountActionBodyNext) => {
  await axiosInstance.post(API_ROUTES.ACCOUNT.ACTION, body);
};

const login = async (body: AccountLoginBody) => {
  // const { requestToken } = await getCsrfToken("/api/" + API_ROUTES.ACCOUNT.LOGIN);
  const { data } = await axiosInstance.post<loginToken>(
    API_ROUTES.ACCOUNT.LOGIN,
    { ...body }
    // {
    //   headers: {
    //     "XSRF-TOKEN": requestToken,
    //   },
    // }
    // token: requestToken
  );
  return data;
};

const getCsrfToken = async (requestPath: string) => {
  console.log(requestPath);
  const { data } = await axiosInstance.get<{ requestToken: string }>(
    API_ROUTES.ACCOUNT.GET_CSRF_TOKEN,
    {
      params: {
        requestPath,
      },
    }
  );
  return data;
};

const remove = async (id: string) => {
  await axiosInstance.delete(API_ROUTES.ACCOUNT.REMOVE, {
    params: { id },
  });
};
const accountAPI = {
  getAll,
  get,
  action,
  login,
  remove,
};

export default accountAPI;
