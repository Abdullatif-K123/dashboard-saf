import { Navigate } from "react-router-dom";
import { Stack } from "@mui/material";

import AccountingTable from "./AccountingTable";
import AccountingTableCash from "./AccountingTableOnline";
import Filter from "./Filter";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
import ConfirmDialog from "features/Accounting/ConfirmDialog";
import AccountingProvider from "features/Accounting/context/AccountingProvider";
import SelectToursButton from "features/Accounting/AccountingTable/SelectToursButton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Accounting = () => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(
    window.location.pathname.includes("/online")
  );
  useEffect(() => {
    setIsOnline(location.pathname.includes("/online"));
  }, [location.pathname]);
  const { hasPermission } = useRoleContext();
  if (!hasPermission(PermissionName.Accounting)) {
    return <Navigate to="/403" />;
  }

  return (
    <AccountingProvider>
      <Stack gap={2}>
        <Filter />
        <SelectToursButton />
        {isOnline ? <AccountingTableCash /> : <AccountingTable />}
        <ConfirmDialog />
      </Stack>
    </AccountingProvider>
  );
};
export default Accounting;
