import { Box, Grid, Stack, SxProps } from "@mui/material";
import { TourDetailsForCustomer } from "API/tour/type";
import hornAudio from "assets/audio/horn.wav";
import LTR from "components/layout/LTR";
import { FC } from "react";
import Chair from "./Chair";
import useTourChairs from "./useTourChairs";

const horn = new Audio(hornAudio);

const sx = {
  bus: {
    mx: "auto",
    mt: 1,
    position: "relative",
    aspectRatio: "134/335",
  },
  busGround: {
    position: "absolute",
    zIndex: 1,
    inset: 0,
    svg: { width: "100%", height: "100%" },
  },
  honk: {
    position: "absolute",
    zIndex: 3,
    borderRadius: "50%",
    top: "2%",
    cursor: "pointer",
    right: "6%",
    width: "23%",
    aspectRatio: "1",
    svg: { width: "100%", height: "100%" },
  },
  seatsContainer: { position: "relative", zIndex: 2, mx: 2, height: "79%", top: "15%" },
} as const satisfies SxProps;

export type TourSeatSelectionProps = {
  tour: TourDetailsForCustomer;
  onSeatSelection: (seat: number) => void;
  currentlyBookedOn: number | undefined;
  selected: number | undefined;
};
export const TourSeatSelection: FC<TourSeatSelectionProps> = ({
  selected,
  onSeatSelection,
  currentlyBookedOn,
  tour,
}) => {
  const bookedChairs = useTourChairs(tour.id);
  const rowsCount =
    tour.model.module.length / tour.model.columnCount +
    (tour.model.module.length % tour.model.columnCount === 0 ? 0 : 1);

  const rowHeight = (1 / rowsCount) * 100;

  const handleHonk = () => {
    horn.play();
    horn.currentTime = 0;
  };
  return (
    <Box sx={sx.bus}>
      <Box sx={sx.busGround} draggable={false} component="img" src="/images/bus-interior.svg" />
      <LTR sx={sx.honk} onClick={handleHonk} />
      <LTR sx={sx.seatsContainer}>
        <Grid container height="100%" spacing={1}>
          {tour.model.module.map((seat, index) =>
            bookedChairs && seat ? (
              <Chair
                clickable={
                  bookedChairs !== null && (!bookedChairs.has(seat) || currentlyBookedOn === seat)
                }
                bookId={
                  seat && currentlyBookedOn !== seat
                    ? bookedChairs.get(seat)?.customerId
                    : undefined
                }
                chairNumber={seat}
                cols={tour.model.columnCount}
                rowHeight={rowHeight}
                key={index}
                onToggleSelect={() => {
                  onSeatSelection(seat);
                }}
                selected={selected === seat}
              />
            ) : (
              <Chair
                bookId={seat ? "loading" : undefined}
                chairNumber={seat}
                cols={tour.model.columnCount}
                rowHeight={rowHeight}
                key={index}
              />
            )
          )}
        </Grid>
        <Stack
          direction={"row"}
          gap={1}
          sx={{
            alignItems: "end",
            justifyContent: "center",
            position: "fixed",
            right: 0,
            left: 0,
            bottom: 9,
          }}
        ></Stack>
      </LTR>
    </Box>
  );
};
export default TourSeatSelection;
