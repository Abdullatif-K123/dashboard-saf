/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Box, Stack, Typography } from "@mui/material";
import { StackProps } from "@mui/system";
import NoDataIcon from "components/icons/NoDataIcon";
import { useTranslation } from "react-i18next";
const NoData = (props: StackProps) => {
  const { t } = useTranslation();
  return (
    //@ts-ignore
    <Stack alignItems={"stretch"} py={1} gap={1} {...props}>
      <Box sx={{ flex: 1 }}>
        <NoDataIcon />
      </Box>
      <Typography color="primary" variant="h5" textAlign={"center"}>
        {t`error.noData`}
      </Typography>
    </Stack>
  );
};
export default NoData;
