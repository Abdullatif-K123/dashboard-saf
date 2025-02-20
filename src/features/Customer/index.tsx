import { Stack } from "@mui/material";
import { Customer } from "API/customer/type";
import { FC, useState } from "react";
import CustomerDetails from "./Details";
import CustomerRecord from "./Record";
import CustomersTable from "./View";
import { Filter } from "./View/Filter";

type Props = {};
const Customer: FC<Props> = ({}) => {
  const [toChangeRecord, setToChangeRecord] = useState<Customer | null>(null);
  return (
    <Stack gap={2}>
      <Filter />
      <CustomersTable setToChangeRecord={setToChangeRecord} />
      <CustomerRecord
        customer={toChangeRecord}
        onClose={() => setToChangeRecord(null)}
      />
      <CustomerDetails />
    </Stack>
  );
};
export default Customer;
