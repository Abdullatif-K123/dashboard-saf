import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import CityFilterAutocomplete from "components/filters/CityFilterAutocomplete";
import CountryFilterAutocomplete from "components/filters/CountryFilterAutocomplete";
import FilterRow from "components/layout/FilterRow";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const RegionFilter: FC<Props> = ({}) => {
  const tName = "region";
  const { t } = useTranslation();

  return (
    <FilterRow>
      <Grid item xs={12} sm={8} md={4}>
        <SearchInput />
      </Grid>
      <Grid item xs={6} sm={8} md={4} lg={2}>
        <CountryFilterAutocomplete label={t(`${tName}.countryName`)} />
      </Grid>
      <Grid item xs={6} sm={8} md={4} lg={2}>
        <CityFilterAutocomplete label={t(`${tName}.cityName`)} />
      </Grid>
    </FilterRow>
  );
};
export default RegionFilter;
