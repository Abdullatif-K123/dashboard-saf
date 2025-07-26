import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import permissionsQueries from "API/permissions/queries";
import { PermissionName } from "API/permissions/type";
import Error from "components/feedback/Error";
import Loading from "components/feedback/Loading";
import { useRoleContext } from "context/RolePermissionsContext";
import PermissionsView from "features/Permissions/PermissionsView";
import PermissionsProvider from "features/Permissions/context/PermissionsProvider";
import useActionSearchParams from "hooks/useActionSearchParams";
import { useTranslation } from "react-i18next";

const PermissionAction = () => {
  const { isActive, id, clearActionParams } = useActionSearchParams();

  const { t } = useTranslation();
  const { data, isLoading, isSuccess, isError, error } =
    permissionsQueries.useDetailsQuery(id ? id : "");
  const { hasEditPermission, hasAddPermission } = useRoleContext();
  const viewOnly =
    !hasEditPermission(PermissionName.Permission) &&
    !hasAddPermission(PermissionName.Permission);
  return (
    <Dialog
      open={isActive}
      onClose={clearActionParams}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle fontSize={30} color="primary">
        {viewOnly
          ? t("permissions.root")
          : hasAddPermission(PermissionName.Permission)
          ? t("permissions.addPermissions")
          : t("permissions.editePermissions")}
      </DialogTitle>
      <DialogContent>
        {isSuccess && data && (
          <PermissionsProvider data={data}>
            <PermissionsView />
          </PermissionsProvider>
        )}
        {isError && <Error error={error} />}
        {isLoading && <Loading sx={{ my: 5 }} />}
      </DialogContent>
    </Dialog>
  );
};

export default PermissionAction;
