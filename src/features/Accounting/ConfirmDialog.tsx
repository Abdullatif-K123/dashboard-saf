import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import accountingQueries from "API/accounting/queries";
import LoadingButton from "components/buttons/LoadingButton";
import ButtonsStack from "components/layout/ButtonsStack";
import controllers from "constants/controllers";
import { useAccountingContext } from "features/Accounting/context/AccountingContext";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";

const ConfirmDialog = () => {
  const { t } = useTranslation();

  const {
    tours,
    clearTours,
    setModalOpened,
    modalOpened,
    setIsSelectionEnabeld,
  } = useAccountingContext();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = accountingQueries.useAction();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onClose = () => {
    clearTours();
    setModalOpened(false);
    setIsSelectionEnabeld(false);
  };

  const handleConfirm = () => {
    mutate(tours, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.ACCOUNTING, "all"]);
        successSnackbar(t("accounting.actionSuccess"));
      },
      onError: (err) => {
        errorSnackbar(err);
      },
      onSettled: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={modalOpened} onClose={onClose} fullWidth maxWidth={"sm"}>
      <Fade in={modalOpened} timeout={0}>
        <DialogTitle fontSize={30} color="primary">
          {t("accounting.receivedConfirm")}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <Typography>{t("accounting.confirmText")}</Typography>
        <ButtonsStack sx={{ mt: "20px" }}>
          <LoadingButton
            isLoading={isLoading}
            variant="contained"
            label={t("generic.confirm")}
            onClick={handleConfirm}
          />
          <Button variant="outlined" onClick={() => onClose()}>
            {t("generic.cancel")}
          </Button>
        </ButtonsStack>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
