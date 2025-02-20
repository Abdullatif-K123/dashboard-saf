import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import BranchFilterAutocomplete from "components/filters/BranchFilterAutocomplete";
import DateFilter from "components/filters/DateFilter";
import FilterRow from "components/layout/FilterRow";
import BooleanSelect from "components/filters/BooleanSelect";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const { t } = useTranslation();

  return (
    <FilterRow sx={{ justifyContent: "center", widdth: "100%" }}>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <BranchFilterAutocomplete label={t("accounting.branchName")} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <DateFilter label={t("generic.from")} name="from" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <DateFilter label={t("generic.to")} name="to" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <BooleanSelect
          name="isCompanyConfirm"
          label={t("accounting.isCompanyConfirm")}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <BooleanSelect
          name="isOwnerConfirm"
          label={t("accounting.isOwnerConfirm")}
        />
      </Grid>
    </FilterRow>
  );
};

export default Filter;
