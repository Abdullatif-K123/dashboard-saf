import LockIcon from "@mui/icons-material/Lock";
import { Button, Stack, Typography } from "@mui/material";
import RouterLink from "components/links/RouterLink";
import { useTranslation } from "react-i18next";

const NoPermission = () => {
  const { t } = useTranslation();
  return (
    <Stack alignItems={"center"} py={10} gap={2}>
      <Typography color="error" variant="h4" textAlign={"center"}>
        {t`error.accessDenied`}
      </Typography>
      <LockIcon sx={{ height: "10rem", width: "10rem" }} color="error" />
      <Typography color="primary" variant="h6" textAlign={"center"}>
        {t`error.noPermission`}
      </Typography>
      <Button
        component={RouterLink}
        variant="contained"
        href="/"
        sx={{ mt: 2, px: "30px !important" }}
      >
        {t("error.backToHome")}
      </Button>
    </Stack>
  );
};
export default NoPermission;
