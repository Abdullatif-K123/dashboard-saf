import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import cityQueries from "../../API/city/queries";
import { CitySelect } from "../../API/city/type";
import Loading from "../feedback/Loading";
type Props = {
  countryId: string | null;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
} & Omit<
  AutocompleteProps<CitySelect, false, false, false>,
  "options" | "renderInput"
>;
const CityAutocomplete: FC<Props> = ({ countryId, ...props }) => {
  const { t } = useTranslation();
  const { data, isLoading } = cityQueries.useSelectQuery(countryId);
  console.log(data);
  return (
    <Autocomplete
      key={countryId}
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
      renderInput={props.renderInput ?? (() => null)}
      loadingText={<Loading />}
      noOptionsText={t("error.noData")}
    />
  );
};
export default CityAutocomplete;
