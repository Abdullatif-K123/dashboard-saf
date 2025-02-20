import axios from "axios";
import i18n from "lib/i18next";
import { storage } from "utils/storage";
import { API_BASE_URL } from "../constants/domain";
let token = storage.getToken();
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept-Language"] = i18n.language;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
window.addEventListener("tokenChanged", () => {
  token = storage.getToken();
});
axios.interceptors.response.use((res) => {
  if (res.status === 401) {
    storage.clearToken();
  }
  return res;
});
export default axiosInstance;
