import { useQuery } from "@tanstack/react-query";
import controllers from "constants/controllers";
import settingsAPI from "./api";

const settingsQueries = {
  useAbout: () =>
    useQuery([controllers.SETTINGS, "about"], settingsAPI.aboutGet),
  usePolicy: () =>
    useQuery([controllers.SETTINGS, "policy"], settingsAPI.policyGet),
  useCompanyRatio: () =>
    useQuery(
      [controllers.SETTINGS, "companyRatio"],
      settingsAPI.companyRatioGet
    ),
};
export default settingsQueries;
