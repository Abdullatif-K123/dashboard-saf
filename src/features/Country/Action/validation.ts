import { CountryActionBody } from "API/country/type";
import yup from "lib/yup";
export const countryActionDefault: CountryActionBody = {
  name: "",
};
const countryActionSchema = yup.object().shape({
  name: yup.string().trim().required(),
});

export default countryActionSchema;
