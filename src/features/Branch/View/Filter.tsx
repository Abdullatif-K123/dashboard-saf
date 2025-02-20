import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import OwnerFilterAutocomplete from "components/filters/OwnerFilterAutocomplete";
import RecordTypeFilter from "components/filters/RecordTypeFilter";
import RegionFilterAutocomplete from "components/filters/RegionFilterAutocomplete";
import FilterRow from "components/layout/FilterRow";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const BranchFilter: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "branch.filter" });

  return (
    <FilterRow>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RegionFilterAutocomplete label={t("region")} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <OwnerFilterAutocomplete label={t("owner")} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RecordTypeFilter label={t("recordType")} />
      </Grid>
    </FilterRow>
  );
};
export default BranchFilter;
