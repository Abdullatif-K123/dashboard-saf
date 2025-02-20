import BrowserUpdatedRoundedIcon from "@mui/icons-material/BrowserUpdatedRounded";
import SecurityUpdateRoundedIcon from "@mui/icons-material/SecurityUpdateRounded";
import { Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
export type UpdateAppProps = {};
export const UpdateApp: FC<UpdateAppProps> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "generic" });
  const isDesktop = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <Stack
      gap={2}
      alignItems={"center"}
      sx={{
        my: "auto",
        ".MuiSvgIcon-root": {
          fontSize: 140,
        },
      }}
    >
      {isDesktop ? <BrowserUpdatedRoundedIcon /> : <SecurityUpdateRoundedIcon />}
      <Typography color="primary" variant="h5">
        {t("newUpdate")}
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        {t("update")}
      </Button>
    </Stack>
  );
};
export default UpdateApp;
