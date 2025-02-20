import { VersionActionType } from "API/version/type";
import yup from "lib/yup";

// Default values for the version action form
export const versionActionDefault: VersionActionType = {
  id: "00000000-0000-0000-0000-000000000000",
  currentVersion: "",
  minimumVersion: "",
};

// Validation schema for the version action form
export const versionActionSchema = yup.object().shape({
  currentVersion: yup.string().trim().required(),
  minimumVersion: yup.string().trim().required(),
});
 
