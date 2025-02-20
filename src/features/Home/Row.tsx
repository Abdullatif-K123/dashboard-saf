import { Stack, StackProps } from "@mui/material";
import { FC, forwardRef } from "react";
export type RowProps = StackProps;
export const Row: FC<RowProps> = forwardRef(function FR(props, ref) {
  return (
    <Stack
      ref={ref}
      {...props}
      sx={{
        flexDirection: "row",
        gap: 1,
        px: 2,
        justifyContent: "space-between",
        cursor: "default",
        "&>*": {
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#4B465C",
        },
      }}
    />
  );
});
