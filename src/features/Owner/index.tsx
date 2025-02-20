import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { Owner } from "../../API/owner/type";
import OwnerDetails from "./Details";
import OwnerRecord from "./Record";
import OwnersTable from "./View";
import { Filter } from "./View/Filter";

type Props = {};
const Owner: FC<Props> = ({}) => {
  const [toChangeRecord, setToChangeRecord] = useState<Owner | null>(null);
  return (
    <Stack gap={2}>
      <Filter />
      <OwnersTable setToChangeRecord={setToChangeRecord} />
      <OwnerRecord owner={toChangeRecord} onClose={() => setToChangeRecord(null)} />
      <OwnerDetails />
    </Stack>
  );
};
export default Owner;
