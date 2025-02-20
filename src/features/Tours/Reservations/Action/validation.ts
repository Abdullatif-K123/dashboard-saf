import { Gender } from "constants/enums";
import i18n from "lib/i18next";
import yup from "lib/yup";
import { TourCustomerForm } from "./type";
export const mobileNumberRegex = /(^(0?9([0-9]{8}))$)|(^$)/;
export const nationalNumberRegex = /(^([0-9]{11})$)/;
export const tourCustomerActionDefault: TourCustomerForm = {
  chairNumber: 0,
  firstName: "",
  isPaid: false,
  gender: Gender.Male,
  lastName: "",
  nationalNumber: "",
  phoneNumber: "",
};
const tourCustomerActionSchema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  gender: yup.number().required(),
  nationalNumber: yup
    .string()
    .trim()
    .matches(nationalNumberRegex, i18n.t("validation.nationalNumber"))
    .required(),
  phoneNumber: yup
    .string()
    .trim()
    .matches(mobileNumberRegex, i18n.t("validation.phoneNumber"))
    .required(),
  isPaid: yup.bool(),
  chairNumber: yup
    .number()
    .transform((value) => (value !== 0 ? value : undefined))
    .required(),
});

export default tourCustomerActionSchema;
