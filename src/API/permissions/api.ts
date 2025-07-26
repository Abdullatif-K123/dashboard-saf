import API_ROUTES from "constants/apiRoutes";
import { Pagination } from "types/api";
import axiosInstance from "../axios";
import {
  NewRole,
  Role,
  RoleBody,
  RoleDetails,
  RolePermissions,
  RolesGetAllParams,
  userRole,
} from "API/permissions/type";

const getAll = async (params: RolesGetAllParams) => {
  const { data } = await axiosInstance.get<Pagination<Role>>(
    API_ROUTES.PERMISSION.GET_ALL,
    {
      params,
    }
  );
  return data;
};

const get = async (id: string) => {
  const { data } = await axiosInstance.get<RoleDetails>(
    API_ROUTES.PERMISSION.GET,
    {
      params: { id },
    }
  );
  return data;
};

const getPermissions = async () => {
  const { data } = await axiosInstance.get<RolePermissions>(
    API_ROUTES.PERMISSION.GET_PERMISSIONS
  );
  return data;
};

const getSelectPermissions = async () => {
  const { data } = await axiosInstance<NewRole[]>(
    API_ROUTES.PERMISSION.GET_SELECT
  );
  return data;
};
const action = async (body: RoleBody) => {
  const { data } = await axiosInstance.post(API_ROUTES.PERMISSION.ACTION, body);
  return data;
};

const getRolePermissions = async () => {
  const { data } = await axiosInstance.get<userRole[]>(
    API_ROUTES.PERMISSION.GET_ROLE
  );
  return data;
};
const remove = async (id: string) => {
  const { data } = await axiosInstance.delete(API_ROUTES.PERMISSION.REMOVE, {
    data: { id },
  });
  return data;
};

const permissionsAPI = {
  getAll,
  get,
  action,
  getPermissions,
  getRolePermissions,
  getSelectPermissions,
  remove,
};

export default permissionsAPI;
