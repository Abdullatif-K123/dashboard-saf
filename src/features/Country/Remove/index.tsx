import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import countryAPI from "API/country/api";
import RemoveDialog from "components/forms/RemoveDialog";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useRemoveSearchParams from "hooks/useRemoveSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
type Props = {};
const CountryRemove: FC<Props> = ({}) => {
  const tName = "country";
  const { t } = useTranslation();
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
      await countryAPI.remove(id ?? "");
      queryClient.invalidateQueries([controllers.COUNTRY, "all"]);
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
export default CountryRemove;
