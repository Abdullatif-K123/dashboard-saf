import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useSnackbarContext } from "../Providers/SnackbarProvider";
import { parseBackendError } from "../utils/apiHelpers";
import { useNavigate } from "react-router-dom";
const useAxiosErrorSnackbar = () => {
  const snackbar = useSnackbarContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return function (err: unknown) {
    let message = t("error.somethingWentWrong");
    if (err instanceof AxiosError) {
      message = parseBackendError(err) ?? message;
      if (err.response?.status === 403) {
        navigate("/403");
      }
    }
    snackbar({ message, severity: "error" });
  };
};
export default useAxiosErrorSnackbar;
