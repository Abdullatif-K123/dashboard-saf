import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Tooltip } from "@mui/material";
import { FC } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { ChairsGrid } from "./ChairsGrid";
export type ChairsRemoverProps = { chairsGrid: ChairsGrid; refresh: () => void };
export const ChairsRemover: FC<ChairsRemoverProps> = ({ chairsGrid, refresh }) => {
  const { t } = useTranslation();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["chair"],
      drop: ({ value }: { value: number }) => {
        chairsGrid.removeChair(value);
        refresh();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [chairsGrid]
  );
  return (
    <Tooltip title={t("model.tooltip.chairRemover")}>
      <Box
        sx={{
          borderRadius: 2,
          width: "fit-content",
          border: (th) => `3px solid ${th.palette.primary.main}`,
          p: 1,
          px: 2,
        }}
      >
        <Box
          ref={drop}
          sx={{
            touchAction: "none",
            height: 40,
            aspectRatio: 1,
            mx: "auto",
            position: "relative",
          }}
        >
          {
            <Box sx={{ svg: { width: 1, height: 1, color: isOver ? "error.main" : "default" } }}>
              <DeleteOutlineIcon />
            </Box>
          }
        </Box>
      </Box>
    </Tooltip>
  );
};
