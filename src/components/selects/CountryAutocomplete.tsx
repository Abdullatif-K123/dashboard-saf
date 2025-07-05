import { Autocomplete, AutocompleteProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import countryQueries from "../../API/country/queries";
import { CountrySelect } from "../../API/country/type";
import Loading from "../feedback/Loading";
type Props = Omit<
  AutocompleteProps<CountrySelect, false, false, false>,
  "options"
>;
const CountryAutocomplete: FC<Props> = ({ ...props }) => {
  const { t } = useTranslation();
  const { data, isLoading } = countryQueries.useSelectQuery();
  console.log("Country", data);
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
      loading={isLoading}
      options={data ?? []}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      loadingText={<Loading />}
      noOptionsText={t("error.noData")}
    />
  );
};
export default CountryAutocomplete;
