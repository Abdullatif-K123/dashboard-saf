import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import RecordTypeFilter from "components/filters/RecordTypeFilter";
import FilterRow from "components/layout/FilterRow";
import { FC } from "react";
import { useTranslation } from "react-i18next";
export type FilterProps = {};
export const Filter: FC<FilterProps> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "owner" });
  return (
    <FilterRow>
      <Grid item xs={8} md={4}>
        <SearchInput />
      </Grid>
      <Grid item xs={8} sm={4} md={2}>
        <RecordTypeFilter label={t("recordType")} />
      </Grid>
    </FilterRow>
  );
};
