import { Stack, StackProps } from "@mui/material";
import { FC } from "react";
export type ListProps = StackProps;
export const List: FC<ListProps> = (props) => {
  return (
    <Stack
      {...props}
      sx={{
        gap: 1,
        py: 1,
        ...props.sx,
      }}
    />
  );
};
