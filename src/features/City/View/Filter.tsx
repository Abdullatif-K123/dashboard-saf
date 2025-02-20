import { Grid } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CountryFilterAutocomplete from "components/filters/CountryFilterAutocomplete";
import SearchInput from "components/Inputs/SearchInput";
import FilterRow from "components/layout/FilterRow";
type Props = {};
const CityFilter: FC<Props> = ({}) => {
  const tName = "city";
  const { t } = useTranslation();
  return (
    <FilterRow>
      <Grid item xs={12} sm={8} md={4}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={8} md={4} lg={2}>
        <CountryFilterAutocomplete label={t(`${tName}.countryName`)} />
      </Grid>
    </FilterRow>
  );
};
export default CityFilter;
