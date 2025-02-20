import i18n from "lib/i18next";
import yup from "lib/yup";
import { ModelActionForm } from "./type";
export const modelActionDefault: ModelActionForm = {
  name: "",
  chairCount: 0,
  rows: 10,
  module: [],
  columns: 4,
};

const modelActionSchema = yup.object().shape({
  name: yup.string().trim().required(),
  chairCount: yup.number().min(1, i18n.t("model.validation.cannotBeEmpty")),
});

export default modelActionSchema;
