import { Grid } from "@mui/material";
import { FC } from "react";
import Chair from "./Chair";
import { ChairsGrid } from "./ChairsGrid";
export type BusGridProps = { chairsGrid: ChairsGrid; refresh: () => void };
export const BusGrid: FC<BusGridProps> = ({ chairsGrid, refresh }) => {
  const rowHeight = (1 / chairsGrid.rowCount) * 100;
  return (
    <Grid container height="100%" spacing={1} direction={"row"}>
      {chairsGrid.blocks.map((_, index) => (
        <Chair
          refresh={refresh}
          index={index}
          chairsGrid={chairsGrid}
          rowHeight={rowHeight}
          key={index}
        />
      ))}
    </Grid>
  );
};
