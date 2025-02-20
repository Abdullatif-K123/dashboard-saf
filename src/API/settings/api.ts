import {
  About,
  AboutActionParams,
  CompanyRatio,
  CompanyRatioActionParams,
  Policy,
  PolicyActionParams,
} from "API/settings/type";
import API_ROUTES from "../../constants/apiRoutes";
import axiosInstance from "../axios";

const policyGet = async () => {
  const { data } = await axiosInstance.get<Policy>(
    API_ROUTES.SETTINGS.GET_POLICY
  );
  return data;
};
const aboutGet = async () => {
  const { data } = await axiosInstance.get<About>(
    API_ROUTES.SETTINGS.GET_ABOUT
  );
  return data;
};
const companyRatioGet = async () => {
  const { data } = await axiosInstance.get<CompanyRatio>(
    API_ROUTES.SETTINGS.GET_COMPANY_RATIO
  );
  return data;
};

const policyAction = async (params: PolicyActionParams) => {
  const { data } = await axiosInstance.post<true>(
    API_ROUTES.SETTINGS.ACTION_POLICY,
    params
  );
  return data;
};

const aboutAction = async (params: AboutActionParams) => {
  const { data } = await axiosInstance.post<true>(
    API_ROUTES.SETTINGS.ACTION_ABOUT,
    params
  );
  return data;
};
const companyRatioAction = async (params: CompanyRatioActionParams) => {
  const { data } = await axiosInstance.post<true>(
    API_ROUTES.SETTINGS.ACTION_COMPANY_RATIO,
    params
  );
  return data;
};
const settingsAPI = {
  policyAction,
  policyGet,
  companyRatioGet, 
  aboutAction,
  aboutGet,
  companyRatioAction,
};

export default settingsAPI;
