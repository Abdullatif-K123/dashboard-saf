import React, { FC, ReactNode, useContext, useState } from "react";
import SnackbarComponent, { AlertSeverity } from "../components/feedback/Snackbar";
export type SnackbarProps = {
  severity: AlertSeverity;
  message: ReactNode;
};
export type SnackBarContextValue = {
  setSnackbarProps: ({ severity, message }: SnackbarProps) => void;
  handleOpenSnackbar: () => void;
};
export const initialSnackbarState = {
  setSnackbarProps: () => {},
  handleOpenSnackbar: () => {},
};
export const SnackbarContext = React.createContext<SnackBarContextValue>(initialSnackbarState);

export const useSnackbarContext = () => {
  const { setSnackbarProps, handleOpenSnackbar } = useContext(SnackbarContext);
  const showSnackbar = (props: SnackbarProps) => {
    setSnackbarProps(props);
    handleOpenSnackbar();
  };
  return showSnackbar;
};
export type Props = { children: ReactNode };
const SnackbarProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    severity: "error",
    message: "",
  });
  const HandleOpenSnackbar = () => {
    setOpen(true);
  };
  const HandleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        setSnackbarProps,
        handleOpenSnackbar: HandleOpenSnackbar,
      }}
    >
      {children}
      <SnackbarComponent
        key={JSON.stringify(snackbarProps)}
        open={open}
        onClose={HandleCloseSnackbar}
        {...snackbarProps}
      />
    </SnackbarContext.Provider>
  );
};
export default SnackbarProvider;
