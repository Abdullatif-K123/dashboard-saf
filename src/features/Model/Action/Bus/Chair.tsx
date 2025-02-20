import { Box, Fade, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import BusSeatIcon from "components/icons/BusSeatIcon";
import themeConstants from "constants/themeConstants";
import { FC, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ChairsGrid } from "./ChairsGrid";
export type ChairProps = {
  rowHeight: number;
  index: number;
  chairsGrid: ChairsGrid;
  refresh: () => void;
};

export const Chair: FC<ChairProps> = ({ refresh, chairsGrid, rowHeight, index }) => {
  const chairValue = chairsGrid.blocks[index];

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "chair",
      item: {
        value: chairValue,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [chairValue]
  );
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ["chair", "picker"],
      canDrop: () => chairsGrid.canMoveTo(index),
      drop: ({ value }: { value: number }) => {
        chairsGrid.move({ value, index });
        refresh();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [chairsGrid]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <Grid
      item
      ref={drop}
      xs={12 / chairsGrid.columnCount}
      component={"div"}
      sx={{
        height: `${rowHeight}%`,
        position: "relative",
        svg: {
          width: "100%",
          height: "100%",
          path: {
            transition: "0.3s fill, 0.3s color",
          },
        },
        ".skeleton": { aspectRatio: "1/1.5", width: "80%", mx: "auto" },
      }}
    >
      <Box sx={{ width: 1, height: 1, position: "relative" }}>
        <Fade in={canDrop}>
          <Box
            sx={{
              position: "absolute",
              height: 1,
              width: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 50,
              maxHeight: 50,
            }}
          >
            <Box
              sx={{
                aspectRatio: 1,
                height: 0.7,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  border: `2px solid ${isOver ? themeConstants.primary : grey[100]}`,
                  width: 0.8,
                  aspectRatio: 1,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 0.6,
                    aspectRatio: 1,
                    borderRadius: "50%",
                    bgcolor: isOver ? themeConstants.primary : grey[100],
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Fade>
        {chairValue !== null && (
          <Box
            ref={drag}
            sx={{
              position: "relative",
              bgcolor: "transparent",
              width: "100%",
              height: "100%",
              maxWidth: 50,
              maxHeight: 50,
            }}
          >
            {!isDragging && (
              <>
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
                    px: 0.5,
                    fontSize: chairsGrid.columnCount > 5 ? 10 : 12,
                  }}
                >
                  {chairValue}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Grid>
  );
};
export default Chair;
