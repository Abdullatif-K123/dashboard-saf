import { Paper as MuiPaper, PaperProps as MuiProps } from "@mui/material";
import { FC } from "react";
export type PaperProps = MuiProps;
export const Paper: FC<PaperProps> = (props) => {
  return (
    <MuiPaper
      elevation={1}
      {...props}
      sx={{ pt: 2, flex: 1, display: "flex", flexDirection: "column", ...props.sx }}
    />
  );
};
