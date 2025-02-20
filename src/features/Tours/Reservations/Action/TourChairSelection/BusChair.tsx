import { Box, ButtonBase, Grid, Skeleton, Typography } from "@mui/material";
import BusSeatIcon from "components/icons/BusSeatIcon";
import { FC } from "react";
export type ChairPropertiesValue = { bgcolor: string; color: string };
export type BusChairProps = {
  chairNumber: number | null | false;
  cols: number;
  rowHeight: number;
  clickable?: boolean;
  bookId: string | undefined;
  onClick: () => void;
  chairProperties: ChairPropertiesValue;
};
export const BusChair: FC<BusChairProps> = ({
  cols,
  rowHeight,
  chairNumber,
  clickable,
  bookId,
  onClick,
  chairProperties,
}) => {
  return (
    <Grid
      item
      xs={12 / cols}
      component={ButtonBase}
      disableRipple
      tabIndex={chairNumber !== null && bookId !== "loading" && clickable ? 0 : -1}
      onClick={onClick}
      sx={{
        height: `${rowHeight}%`,
        "&:focus-visible .chair": {
          borderRadius: 1,
          outline: (th) => `2px solid ${th.palette.primary.main}`,
        },
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
      {chairNumber !== null && bookId !== "loading" && (
        <Box
          className="chair"
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <BusSeatIcon color={chairProperties.bgcolor} />
          <Typography
            sx={{
              position: "absolute",
              cursor: clickable ? "pointer" : "default",
              userSelect: "none",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: chairProperties.color,
              fontSize: "clamp(10px,1.5vw,12px)",
              fontWeight: "bold",
            }}
          >
            {chairNumber}
          </Typography>
        </Box>
      )}
      {chairNumber !== null && bookId === "loading" && <Skeleton className="skeleton" />}
    </Grid>
  );
};
