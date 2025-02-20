import { Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import permissionsQueries from "API/permissions/queries";
import { PermissionName } from "API/permissions/type";
import Loading from "components/feedback/Loading";
import controllers from "constants/controllers";
import { useRoleContext } from "context/RolePermissionsContext";

import Head from "features/Permissions/PermissionsView/Head";
import PermissionsTable from "features/Permissions/PermissionsView/PermissionsTable";
import usePermissionsContext from "features/Permissions/context/permissions-context";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { useTranslation } from "react-i18next";

const PermissionsView = () => {
  const { t } = useTranslation();
  const { clearActionParams } = useActionSearchParams();
  const { role } = usePermissionsContext();
  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useAxiosErrorSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = permissionsQueries.useAction();

  const handlePermissionsSubmit = () => {
    mutate(role, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.PERMISSION, "all"]);
        queryClient.invalidateQueries([
          controllers.PERMISSION,
          "details",
          role.roleId,
        ]);
        queryClient.invalidateQueries([controllers.PERMISSION, "permissions"]);
        successSnackbar(t("permissions.message.edit"));
      },
      onError: (err) => {
        errorSnackbar(err);
      },
      onSettled: () => {
        clearActionParams();
      },
    });
  };
  const { hasEditPermission } = useRoleContext();

  return (
    <Stack>
      <Head />
      <PermissionsTable sx={{ my: 2 }} />
      {hasEditPermission(PermissionName.Permission) && (
        <Stack direction="row" gap={2}>
          <Button
            disabled={isLoading}
            variant="contained"
            onClick={handlePermissionsSubmit}
          >
            {isLoading ? <Loading size={20} /> : t("generic.submit")}
          </Button>
          <Button onClick={clearActionParams}>{t("generic.cancel")}</Button>
        </Stack>
      )}
    </Stack>
  );
};

export default PermissionsView;
