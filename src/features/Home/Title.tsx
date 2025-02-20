import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";
export type TitleProps = TypographyProps;
export const Title: FC<TitleProps> = (props) => {
  return (
    <Typography
      variant="h6"
      {...props}
      sx={{
        color: "#4B465C",
        justifyContent: "center",
        display: "flex",
        ...props.sx,
      }}
    />
  );
};
