import { useQueryClient } from "@tanstack/react-query";
import controllers from "constants/controllers";
import { useSocketConnectionContext } from "context/socketHubConnectionContext";
import { useEffect } from "react";
export const usePendingCountSubscription = () => {
  const queryClient = useQueryClient();
  const connection = useSocketConnectionContext();
  useEffect(() => {
    if (!connection) return;
    connection.on("pendingResult", (branches = 0, owners = 0, customers = 0) => {
      const {
        customers: oldCustomers,
        owners: oldOwners,
        branches: oldBranches,
      } = queryClient.getQueryData([controllers.HOME, "pendingCounts"]) as { [k: string]: number };
      if (customers !== oldCustomers) {
        queryClient.invalidateQueries([controllers.CUSTOMER, "all"]);
      }
      if (owners !== oldOwners) {
        queryClient.invalidateQueries([controllers.OWNER, "all"]);
      }
      if (branches !== oldBranches) {
        queryClient.invalidateQueries([controllers.BRANCH, "all"]);
      }
      queryClient.setQueryData([controllers.HOME, "pendingCounts"], {
        customers,
        owners,
        branches,
      });
    });
  }, [queryClient, connection]);
};
export default usePendingCountSubscription;
