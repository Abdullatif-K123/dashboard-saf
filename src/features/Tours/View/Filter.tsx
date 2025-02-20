import { Grid } from "@mui/material";
import BranchFilterAutocomplete from "components/filters/BranchFilterAutocomplete";
import OwnerFilterAutocomplete from "components/filters/OwnerFilterAutocomplete";
import TourStatusFilter from "components/filters/TourStatusFilter";
import SearchInput from "components/Inputs/SearchInput";
import FilterRow from "components/layout/FilterRow";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const JourneyFilter: FC<Props> = ({}) => {
  const tName = "tour";
  const { t } = useTranslation();

  return (
    <FilterRow>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <OwnerFilterAutocomplete label={t(`${tName}.ownerName`)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <BranchFilterAutocomplete label={t(`${tName}.branchName`)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <TourStatusFilter label={t(`${tName}.tourStatus`)} />
      </Grid>
    </FilterRow>
  );
};
export default JourneyFilter;
