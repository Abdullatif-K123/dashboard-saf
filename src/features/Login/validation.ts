import { AccountLoginBody } from "API/account/type";
import i18n from "lib/i18next";
import yup from "lib/yup";
import { ObjectSchema } from "yup";
import { passwordRegex, userNameRegex } from "../Account/Action/validation";

export const loginDefault: AccountLoginBody = {
  userName: "",
  password: "",
  rememberMe: true,
  fcmToken: "",
};
const loginSchema: ObjectSchema<AccountLoginBody> = yup.object({
  userName: yup
    .string()
    .trim()
    .required()
    .matches(userNameRegex, i18n.t("account.validation.userName")),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(passwordRegex, i18n.t(`account.validation.password`)),
  rememberMe: yup.boolean().required(),
  fcmToken: yup.string(),
});
export default loginSchema;
