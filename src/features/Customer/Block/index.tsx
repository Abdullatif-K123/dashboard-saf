import { DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import { Stack } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import customerAPI from "API/customer/api";
import { Customer } from "API/customer/type";
import Loading from "components/feedback/Loading";
import DialogTitle from "components/forms/DialogTitle";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  customer: Customer | null;
  clearCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
};
const CustomerBlock: FC<Props> = ({ customer, clearCustomer }) => {
  const tName = "customer";
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    clearCustomer(null);
  };

  const handleBlock = async () => {
    try {
      setLoading(true);
      await customerAPI.toggleBlock(customer?.id ?? "");
      queryClient.invalidateQueries([controllers.CUSTOMER, "all"]);
      handleClose();
      successSnackbar(t(`${tName}.message.${customer?.isBlocked ? "unblock" : "block"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
    setLoading(false);
  };

  return (
    <Dialog open={!!customer} onClose={handleClose}>
      <Stack width={500} maxWidth="100%">
        <DialogTitle onClose={handleClose}>
          {t(`${tName}.${customer?.isBlocked ? "unblock" : "block"}`)}
        </DialogTitle>
        <DialogContent>{loading && <Loading />}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "primary.main",
              bgcolor: "white",
              border: "1px solid",
              borderColor: "primary.main",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            {t("generic.cancel")}
          </Button>
          <Button
            disabled={loading}
            onClick={handleBlock}
            sx={{
              bgcolor: customer?.isBlocked ? "success.main" : "error.main",
              color: "white",
              "&:hover": {
                bgcolor: customer?.isBlocked ? "success.main" : "error.main",
                color: "white",
              },
              px: 2,
            }}
          >
            {t(`generic.${customer?.isBlocked ? "unblock" : "block"}`)}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};
export default CustomerBlock;
