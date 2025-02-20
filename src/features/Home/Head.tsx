import { Divider } from "@mui/material";
import { FC } from "react";
import { Row, RowProps } from "./Row";
export type HeadProps = RowProps;
export const Head: FC<HeadProps> = (props) => {
  return (
    <>
      <Divider sx={{ mt: 1 }} />
      <Row py={1} {...props} />
      <Divider sx={{ mb: 1 }} />
    </>
  );
};
