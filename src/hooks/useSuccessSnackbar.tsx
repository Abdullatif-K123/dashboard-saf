import { ReactNode } from "react";
import { useSnackbarContext } from "../Providers/SnackbarProvider";
const useSuccessSnackbar = () => {
  const snackbar = useSnackbarContext();
  return function (message: ReactNode) {
    snackbar({ message, severity: "success" });
  };
};
export default useSuccessSnackbar;
