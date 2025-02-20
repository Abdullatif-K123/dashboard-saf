import { Box, Fade } from "@mui/material";
import Skeleton from "components/feedback/Skeleton";
import { FC } from "react";
import { Row } from "./Row";
export type SkeletonRowsProps = { count?: number; columns?: number; fadeOffset: number };
export const SkeletonRows: FC<SkeletonRowsProps> = ({ columns = 4, count = 4, fadeOffset }) => {
  return (
    <>
      {Array(columns)
        .fill(0)
        .map((value, index) => (
          <Fade in={true} key={index} timeout={500 * index + fadeOffset}>
            <Row height={47.5}>
              {Array(count)
                .fill(0)
                .map((value, index) => (
                  <Box key={index}>
                    <Skeleton widthRange={{ min: 30, max: 40 }} height={30} />
                  </Box>
                ))}
            </Row>
          </Fade>
        ))}
    </>
  );
};
