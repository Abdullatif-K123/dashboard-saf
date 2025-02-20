/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { CircularProgress, CircularProgressProps, Stack } from "@mui/material";
import { StackProps } from "@mui/system";
import { FC } from "react";
type Props = CircularProgressProps & { stackProps?: StackProps; in?: boolean };
const Loading: FC<Props> = ({ stackProps, in: show = true, ...props }) => {
  return show ? (
    //@ts-ignore
    <Stack alignItems={"center"} justifyContent="center" {...stackProps}>
      <CircularProgress {...props} />
    </Stack>
  ) : (
    <></>
  );
};
export default Loading;
