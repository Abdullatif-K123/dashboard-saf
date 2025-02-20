import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";
import FilterRow from "components/layout/FilterRow";
import { FC } from "react";
type Props = {};
const ModelFilter: FC<Props> = ({}) => {
  return (
    <FilterRow>
      <Grid item xs={12} sm={8} md={4}>
        <SearchInput />
      </Grid>
    </FilterRow>
  );
};
export default ModelFilter;
