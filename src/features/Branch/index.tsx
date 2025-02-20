import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { Branch } from "../../API/branch/type";
import BranchDetails from "./Details";
import BranchRecord from "./Record";
import BranchRemove from "./Remove";
import BranchesTable from "./View";
import BranchFilter from "./View/Filter";

type Props = {};
const Branch: FC<Props> = ({}) => {
  const [toChangeRecord, setToChangeRecord] = useState<Branch | null>(null);
  return (
    <Stack gap={2}>
      <BranchFilter />
      <BranchesTable setToChangeRecord={setToChangeRecord} />
      <BranchRemove />
      <BranchDetails />
      <BranchRecord branch={toChangeRecord} onClose={() => setToChangeRecord(null)} />
    </Stack>
  );
};
export default Branch;
