import { Stack, Typography } from "@mui/material";
import SearchInput from "features/Permissions/PermissionsView/SearchInput";
import usePermissionsContext from "features/Permissions/context/permissions-context";
import { useTranslation } from "react-i18next";

const Head = () => {
  const { role } = usePermissionsContext();
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="space-between"
      gap={2}
    >
      <Stack gap={1} flex={1} sx={{ minWidth: 150 }}>
        <Typography variant="body1">{t("permissions.roleName")}</Typography>
        <Typography
          sx={{
            px: 2,
            py: 1,
            borderRadius: "20px",
            border: "1px solid #c9c9c9",
          }}
          component="input"
        >
          {role.roleName}
        </Typography>
      </Stack>
      <Stack gap={1} flex={1} sx={{ minWidth: 150 }}>
        <Typography variant="body1">
          {t("permissions.permissionSearch")}
        </Typography>
        <SearchInput />
      </Stack>
    </Stack>
  );
};

export default Head;
