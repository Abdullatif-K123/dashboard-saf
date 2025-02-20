import API_ROUTES from "../../constants/apiRoutes";
import axiosInstance from "../axios";

const removeUnused = async () => {
  await axiosInstance.delete<boolean>(API_ROUTES.FILE.REMOVE_UNUSED);
};
const fileAPI = {
  removeUnused,
};

export default fileAPI;
