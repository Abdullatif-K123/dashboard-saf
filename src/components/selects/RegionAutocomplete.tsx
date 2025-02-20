import { Autocomplete, AutocompleteProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import regionQueries from "../../API/region/queries";
import { RegionSelect } from "../../API/region/type";
import Loading from "../feedback/Loading";
type Props = { countryId: string | null; cityId: string | null } & Omit<
  AutocompleteProps<RegionSelect, false, false, false>,
  "options"
>;
const RegionAutocomplete: FC<Props> = ({ countryId, cityId, ...props }) => {
  const { t } = useTranslation();
  const { data, isLoading } = regionQueries.useSelectQuery({ cityId, countryId });
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
      loading={isLoading}
      options={data ?? []}
      getOptionLabel={(option) => option.regionName}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.regionName}
        </li>
      )}
      loadingText={<Loading />}
      noOptionsText={t("error.noData")}
    />
  );
};
export default RegionAutocomplete;
