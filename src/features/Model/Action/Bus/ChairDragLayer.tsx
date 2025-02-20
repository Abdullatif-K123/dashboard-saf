import { Box, Typography, useTheme } from "@mui/material";
import BusSeatIcon from "components/icons/BusSeatIcon";
import themeConstants from "constants/themeConstants";
import { FC } from "react";
import { useDragLayer } from "react-dnd";
export type ChairDragLayerProps = {};
export const ChairDragLayer: FC<ChairDragLayerProps> = ({}) => {
  const isLTR = useTheme().direction === "ltr";
  const { currentOffset, isDragging, item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));
  if (!isDragging) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        left: 0,
        top: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          width: 40,
          position: "absolute",
          [isLTR ? "left" : "right"]: currentOffset?.x,
          top: currentOffset?.y,
          svg: { width: 1, height: 1 },
        }}
      >
        <BusSeatIcon color={themeConstants.primary} />
        <Typography
          sx={{
            position: "absolute",
            cursor: "grab",
            inset: 0,
            top: -6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            fontSize: "100%",
          }}
        >
          {item.value}
        </Typography>
      </Box>
    </div>
  );
};
