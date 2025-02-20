import { Stack } from "@mui/material";
import { FC } from "react";
import BusDetails from "./Details";
import BusesTable from "./View";
import BusFilter from "./View/Filter";

type Props = {};
const Bus: FC<Props> = ({}) => {
  return (
    <Stack gap={2}>
      <BusFilter />
      <BusesTable />
      <BusDetails />
    </Stack>
  );
};
export default Bus;
