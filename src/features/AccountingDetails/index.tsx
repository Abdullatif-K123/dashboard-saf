import { Stack } from "@mui/material";
import AccountingDetailsTable from "features/AccountingDetails/AccountingDetailsTable";
import Filters from "features/AccountingDetails/Filters";

const AccountingDetails = () => {
  return (
    <Stack spacing={2}>
      <Filters />
      <AccountingDetailsTable />
    </Stack>
  );
};

export default AccountingDetails;
