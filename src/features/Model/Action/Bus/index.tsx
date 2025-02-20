import { FC, useMemo, useState } from "react";

import { Stack } from "@mui/material";
import LTR from "components/layout/LTR";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";
import { BusGrid } from "./BusGrid";
import { BusLayout } from "./BusLayout";
import { ChairDragLayer } from "./ChairDragLayer";
import { ChairsGrid } from "./ChairsGrid";
import { ChairsPicker } from "./ChairsPicker";
import { ChairsRemover } from "./ChairsRemover";
export type BusProps = {
  rows: number;
  columns: number;
  setModule: (arr: (number | null)[]) => void;
  initialModule: (number | null)[];
};
export const Bus: FC<BusProps> = ({ rows, columns, setModule, initialModule }) => {
  const chairsGrid = useMemo(() => {
    return new ChairsGrid({
      columns,
      rows,
      blocks: initialModule,
    });
  }, [columns, rows, initialModule]);

  const [, setRefresh] = useState(false);
  return (
    <DndProvider options={HTML5toTouch}>
      <ChairDragLayer />
      <Stack>
        <Stack component={LTR} sx={{ gap: 0.5, flexDirection: "row", justifyContent: "center" }}>
          <ChairsPicker chairsGrid={chairsGrid} />
          <ChairsRemover
            chairsGrid={chairsGrid}
            refresh={() => {
              setModule(chairsGrid.blocks);
              setRefresh((prev) => !prev);
            }}
          />
        </Stack>
        <BusLayout>
          <BusGrid
            chairsGrid={chairsGrid}
            refresh={() => {
              setModule(chairsGrid.blocks);
            }}
          />
        </BusLayout>
      </Stack>
    </DndProvider>
  );
};
