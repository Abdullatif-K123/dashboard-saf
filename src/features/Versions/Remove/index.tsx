import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FC, useState } from "react";
import versionAPI from "API/version/api";
import RemoveDialog from "components/forms/RemoveDialog";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useRemoveSearchParams from "hooks/useRemoveSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
type Props = {};
const VersionRemove: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "settings" });
  const tName = "version";
  const queryClient = useQueryClient();
  const { id, isActive, clearRemoveParams } = useRemoveSearchParams();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    clearRemoveParams();
  };
  const handleRemove = async () => {
    try {
      setIsLoading(true);
      await versionAPI.remove(id ?? "");
      queryClient.invalidateQueries([controllers.VERSION, "all"]);
      handleClose();
      successSnackbar(t(`${tName}.message.remove`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
    setIsLoading(false);
  };
  return (
    <RemoveDialog
      handleCancel={handleClose}
      handleRemove={handleRemove}
      open={isActive}
      isLoading={isLoading}
    >
      {t(`${tName}.remove`)}
    </RemoveDialog>
  );
};

export default VersionRemove;
