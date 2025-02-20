import i18n from "lib/i18next";
import yup from "lib/yup";
import { CityActionForm } from "./type";
export const cityActionDefault: CityActionForm = {
  name: "",
  latitude: 0.5,
  longitude: 0.5,
  country: null,
};

const cityActionSchema = yup.object().shape({
  name: yup.string().trim().required(),
  country: yup.object().nullable().required(),
  latitude: yup.number().typeError(i18n.t("validation.required")).required(),
  longitude: yup.number().typeError(i18n.t("validation.required")).required(),
});

export default cityActionSchema;
