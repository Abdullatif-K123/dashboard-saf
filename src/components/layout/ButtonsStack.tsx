/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Stack } from "@mui/material";
import { StackProps } from "@mui/system";
import { FC } from "react";
type Props = {} & StackProps;
const ButtonsStack: FC<Props> = (props) => {
  //@ts-ignore
  return <Stack direction="row" gap={0.5} justifyContent="center" {...props} />;
};
export default ButtonsStack;
