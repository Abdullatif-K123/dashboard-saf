import { AccountActionBody } from "API/account/type";
import i18n from "lib/i18next";
import yup from "lib/yup";
export const accountActionDefault: AccountActionBody = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  roles: [],
};
export const userNameRegex = /^[a-z0-9_-]*$/i;
export const phoneNumberRegex = /^(0?9([0-9]{8}))$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|])\S{8,}$/;
const accountActionSchema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  phoneNumber: yup
    .string()
    .required()
    .matches(phoneNumberRegex, i18n.t("account.validation.phoneNumber")),
  roles: yup.array().min(1),
  userName: yup.string().required().matches(userNameRegex, i18n.t("account.validation.userName")),
  password: yup
    .string()
    .min(8)
    .nullable()
    .transform((_, val) => (val ? val : null))
    .when("id", {
      is: (id: string) => !id,
      then: (schema) =>
        schema.required().matches(passwordRegex, i18n.t(`account.validation.password`)),
    }),
});

export default accountActionSchema;
