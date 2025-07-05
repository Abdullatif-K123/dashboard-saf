import API_ROUTES from "constants/apiRoutes";
import { Pagination } from "types/api";
import axiosInstance from "../axios";
import {
  Role,
  RoleBody,
  RoleDetails,
  RolePermissions,
  RolesGetAllParams,
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
      params: { roleId: id },
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

const action = async (body: RoleBody) => {
  const { data } = await axiosInstance.post(API_ROUTES.PERMISSION.ACTION, body);
  return data;
};

const getRolePermissions = async (roleId: string) => {
  const { data } = await axiosInstance.get<RolePermissions>(
    API_ROUTES.PERMISSION.GET_ROLE,
    {
      params: { roleId },
    }
  );
  return data;
};

const permissionsAPI = {
  getAll,
  get,
  action,
  getPermissions,
  getRolePermissions,
};

export default permissionsAPI;
