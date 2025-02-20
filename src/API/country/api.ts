import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import { Country, CountryActionBody, CountryDetails, CountryGetAllParams } from "./type";

const getAll = async (params: CountryGetAllParams) => {
  const { data } = await axiosInstance.get<Pagination<Country>>(API_ROUTES.COUNTRY.GET_ALL, {
    params,
  });
  return data;
};
const get = async (countryId: string) => {
  const { data } = await axiosInstance.get<CountryDetails>(API_ROUTES.COUNTRY.GET, {
    params: { countryId },
  });
  return data;
};
const getAllNp = async () => {
  const { data } = await axiosInstance.get<Country[]>(API_ROUTES.COUNTRY.GET_SELECT);
  return data;
};
const action = async (body: CountryActionBody) => {
  await axiosInstance.post(API_ROUTES.COUNTRY.ACTION, body);
};
const remove = async (countryId: string) => {
  await axiosInstance.delete(API_ROUTES.COUNTRY.REMOVE, { params: { countryId } });
};
const countryAPI = {
  getAll,
  getAllNp,
  get,
  action,
  remove,
};

export default countryAPI;
