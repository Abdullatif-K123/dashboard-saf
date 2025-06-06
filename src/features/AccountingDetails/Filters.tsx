import FilterRow from "components/layout/FilterRow";
import { Grid } from "@mui/material";
import SearchInput from "components/Inputs/SearchInput";

const Filters = () => {
  return (
    <FilterRow sx={{ justifyContent: "rigth", widdth: "100%" }}>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
    </FilterRow>
  );
};

export default Filters;
