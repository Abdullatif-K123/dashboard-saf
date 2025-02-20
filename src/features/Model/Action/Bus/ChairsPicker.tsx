import { Box, Typography } from "@mui/material";
import BusSeatIcon from "components/icons/BusSeatIcon";
import themeConstants from "constants/themeConstants";
import { FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ChairsGrid } from "./ChairsGrid";
export type ChairsPickerProps = { chairsGrid: ChairsGrid };
export const ChairsPicker: FC<ChairsPickerProps> = ({ chairsGrid }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "picker",
      item: { value: chairsGrid.nextValue },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [chairsGrid.nextValue]
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "fit-content",
        border: (th) => `3px solid ${th.palette.primary.main}`,
        p: 1,
        px: 4,
      }}
    >
      <Box
        ref={drag}
        sx={{
          touchAction: "none",
          height: 40,
          aspectRatio: 1,
          mx: "auto",
          position: "relative",
        }}
      >
        {!isDragging && chairsGrid.nextValue && (
          <Box sx={{ svg: { width: 1, height: 1 } }}>
            <BusSeatIcon color={themeConstants.primary} />
            <Typography
              sx={{
                position: "absolute",
                cursor: "grab",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                fontSize: "100%",
              }}
            >
              {chairsGrid.nextValue}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
