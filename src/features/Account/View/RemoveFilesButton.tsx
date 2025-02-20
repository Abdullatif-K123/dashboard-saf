import fileAPI from "API/file/api";
import Submit, { SubmitProps } from "components/buttons/Submit";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
type RemoveFilesButtonProps = SubmitProps;
export const RemoveFilesButton: FC<RemoveFilesButtonProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useAxiosErrorSnackbar();
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await fileAPI.removeUnused();
      successSnackbar(t("file.message.remove"));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
    setIsLoading(false);
  };
  return (
    <Submit type="button" onClick={handleSubmit} isSubmitting={isLoading} {...props}>
      {t("file.removeUnUsed")}
    </Submit>
  );
};
export default RemoveFilesButton;
