import API_ROUTES from "constants/apiRoutes";
import axiosInstance from "API/axios";
import { version, VersionActionType } from "./type";

const getAll = async () => {
  const { data } = await axiosInstance.get<version>(API_ROUTES.Version.GET_ALL);
  return data.data;
};
const action = async (body: VersionActionType) => {
  const { data } = await axiosInstance.put(
    API_ROUTES.Version.ACTION_VERSION,
    body
  );
  return data.data;
};
const get = async (id: string) => {
  const { data } = await axiosInstance.get<version>(API_ROUTES.Version.GET, {
    params: { id: id },
  });
  return data;
};

const remove = async (id: string) => {
  await axiosInstance.delete(API_ROUTES.Version.DELETE, { params: { id } });
};

const versionAPI = {
  remove,
  getAll,
  get,
  action,
};

export default versionAPI;
