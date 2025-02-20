import yup from "lib/yup";
import { RegionActionForm } from "./type";
export const regionActionDefault: RegionActionForm = {
  name: "",
  city: null,
  country: null,
};
const regionActionSchema = yup.object().shape({
  name: yup.string().trim().required(),
  city: yup.object().nullable().required(),
});

export default regionActionSchema;
