import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axiosInstance from "../axios";
import {
  BookedChair,
  Tour,
  TourBookBody,
  TourCustomer,
  TourCustomerAction,
  TourDetails,
  TourDetailsForCustomer,
  TourDetailsForCustomerParams,
  TourGetAllBody,
  TourGetAllParams,
  TourGetCustomersParams,
} from "./type";

const getAll = async (params: TourGetAllParams, body: TourGetAllBody) => {
  const { data } = await axiosInstance.put<Pagination<Tour>>(API_ROUTES.TOUR.GET_ALL, body, {
    params,
  });
  return data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<TourDetails>(API_ROUTES.TOUR.GET, { params: { id } });
  return data;
};
const getForCustomer = async (params: TourDetailsForCustomerParams) => {
  const { data } = await axiosInstance.get<TourDetailsForCustomer>(API_ROUTES.CUSTOMER_TOUR.GET, {
    params,
  });
  data.model.module = parseModelArray(data.model.module as unknown as string);
  return data;
};
const getCustomers = async (params: TourGetCustomersParams) => {
  const { data } = await axiosInstance.get<Pagination<TourCustomer>>(
    API_ROUTES.CUSTOMER_TOUR.GET_CUSTOMERS,
    { params }
  );
  return data;
};
const unbook = async ({ body }: { body: TourBookBody }) => {
  const { data } = await axiosInstance.delete<true>(API_ROUTES.CUSTOMER_TOUR.REMOVE_CUSTOMER, {
    data: body,
  });
  return data;
};
const customerAction = async (body: TourCustomerAction) => {
  const { data } = await axiosInstance.post<string>(API_ROUTES.CUSTOMER_TOUR.ACTION_CUSTOMER, body);
  return data;
};
const getBusBookedChairs = async (tourId: string) => {
  await new Promise((res) => setTimeout(res, 10000));
  const { data } = await axiosInstance.get<BookedChair[]>(
    API_ROUTES.CUSTOMER_TOUR.GET_CUSTOMER_CHAIRS_REALTIME,
    {
      params: { tourId },
    }
  );
  return data;
};

const tourAPI = {
  getAll,
  get,
  getCustomers,
  customerAction,
  unbook,
  getBusBookedChairs,
  getForCustomer,
};

export function parseModelArray(str: string): (number | null)[] {
  try {
    return JSON.parse(str) as (number | null)[];
  } catch {
    return [];
  }
}

export default tourAPI;
