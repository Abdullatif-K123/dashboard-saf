import { useQueryClient } from "@tanstack/react-query";
import modelQueries from "API/model/queries";
import RemoveDialog from "components/forms/RemoveDialog";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useRemoveSearchParams from "hooks/useRemoveSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const ModelRemove: FC<Props> = ({}) => {
  const tName = "model";
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id, isActive, clearRemoveParams } = useRemoveSearchParams();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const remove = modelQueries.useRemove();

  const handleClose = () => {
    clearRemoveParams();
  };

  const handleRemove = () => {
    remove.mutate(id ?? "", {
      onSuccess: () => {
        queryClient.removeQueries([controllers.MODEL, "all"]);
        successSnackbar(t(`${tName}.message.remove`));
        handleClose();
      },
      onError: errorSnackbar,
    });
  };

  return (
    <RemoveDialog
      handleCancel={handleClose}
      handleRemove={handleRemove}
      open={isActive}
      isLoading={remove.isLoading}
    >
      {t(`${tName}.remove`)}
    </RemoveDialog>
  );
};
export default ModelRemove;
