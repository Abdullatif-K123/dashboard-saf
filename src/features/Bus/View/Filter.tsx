import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import BranchFilterAutocomplete from "components/filters/BranchFilterAutocomplete";
import CityFilterAutocomplete from "components/filters/CityFilterAutocomplete";
import OwnerFilterAutocomplete from "components/filters/OwnerFilterAutocomplete";
import RegionFilterAutocomplete from "components/filters/RegionFilterAutocomplete";
import FilterRow from "components/layout/FilterRow";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const BusFilter: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "bus.filter" });

  return (
    <FilterRow>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CityFilterAutocomplete label={t(`city`)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RegionFilterAutocomplete label={t(`region`)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <OwnerFilterAutocomplete label={t(`owner`)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <BranchFilterAutocomplete label={t(`branch`)} />
      </Grid>
    </FilterRow>
  );
};
export default BusFilter;
