import i18n from "lib/i18next";
import yup from "lib/yup";

const companyRatioActionSchema = yup.object().shape({
  companyRatio: yup
    .number()
    .typeError(i18n.t("validation.required"))
    .required(),
  serviceRatio: yup
    .number()
    .typeError(i18n.t("validation.required"))
    .required(),
});

export default companyRatioActionSchema;
