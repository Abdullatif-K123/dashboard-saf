import { Box, Button, Stack, StackProps, Typography } from "@mui/material";
import ErrorPersonIcon from "components/icons/ErrorPersonIcon";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = { retry?: () => void } & StackProps;
const SomethingWentWrong: FC<Props> = ({ retry, ...props }) => {
  const { t } = useTranslation();
  return (
    <Stack alignItems={"center"} py={2} gap={1} {...props}>
      <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <ErrorPersonIcon />
      </Box>
      <Typography color="primary" variant="h4" textAlign={"center"}>
        {t`error.sorry`}
      </Typography>
      <Typography color="primary" variant="body1" textAlign={"center"}>
        {t`error.somethingWentWrong`}
      </Typography>
      {retry && (
        <Button onClick={retry} variant="contained" sx={{ mt: 2, px: "30px !important" }}>
          {t("error.retry")}
        </Button>
      )}
    </Stack>
  );
};
export default SomethingWentWrong;
