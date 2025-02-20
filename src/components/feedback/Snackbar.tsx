import { AlertTitle } from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { FC, ReactNode } from "react";

export type Props = {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
  severity: AlertSeverity;
  autoHideDuration?: number;
  alertProps?: AlertProps;
  snackBarProps?: SnackbarProps;
};
export type AlertSeverity = "error" | "warning" | "info" | "success";

const SnackbarComponent: FC<Props> = ({
  open,
  onClose,
  severity,
  message,
  autoHideDuration = 4000,
  snackBarProps,
  alertProps,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      {...snackBarProps}
      sx={{ mx: "auto", width: "fit-content", ...snackBarProps?.sx }}
    >
      <Alert
        severity={severity}
        elevation={5}
        onClose={onClose}
        {...alertProps}
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          ...alertProps?.sx,
        }}
      >
        <AlertTitle
          sx={{
            mx: 2,
            textAlign: "center",
          }}
        >
          {message}
        </AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
