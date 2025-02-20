import { Grid } from "@mui/material";
import PageNumberInput from "components/Inputs/PageNumberInput";
import SearchInput from "components/Inputs/SearchInput";
import RecordTypeFilter from "components/filters/RecordTypeFilter";
import FilterRow from "components/layout/FilterRow";
import PageSizeSelect from "components/selects/PageSizeSelect";
import ExportCustomersButton from "features/Customer/View/ExportButton";
import { useTranslation } from "react-i18next";

export const Filter = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "customer" });
  return (
    <FilterRow>
      <Grid item xs={8} md={4}>
        <SearchInput />
      </Grid>
      <Grid item xs={8} sm={4} md={2}>
        <RecordTypeFilter label={t("recordType")} />
      </Grid>
      <Grid item xs={8} sm={4} md={2}>
        <PageNumberInput />
      </Grid>
      <Grid item xs={8} sm={4} md={2}>
        <PageSizeSelect />
      </Grid>
      <Grid item xs={8} sm={4} md={2}>
        <ExportCustomersButton />
      </Grid>
    </FilterRow>
  );
};
