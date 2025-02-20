import { Stack } from "@mui/material";
import { FC } from "react";
import TourDetails from "./Details";
import ToursTable from "./View";
import JourneyFilter from "./View/Filter";

type Props = {};
const Tour: FC<Props> = ({}) => {
  return (
    <Stack gap={2}>
      <JourneyFilter />
      <ToursTable />
      <TourDetails />
    </Stack>
  );
};
export default Tour;
