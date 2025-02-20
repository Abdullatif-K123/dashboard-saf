import { DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import { Stack } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import ownerAPI from "API/owner/api";
import { Owner } from "API/owner/type";
import Loading from "components/feedback/Loading";
import DialogTitle from "components/forms/DialogTitle";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  owner: Owner | null;
  clearOwner: React.Dispatch<React.SetStateAction<Owner | null>>;
};
const OwnerBlock: FC<Props> = ({ owner, clearOwner }) => {
  const tName = "owner";
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    clearOwner(null);
  };

  const handleBlock = async () => {
    try {
      setLoading(true);
      await ownerAPI.toggleBlock(owner?.id ?? "");
      queryClient.invalidateQueries([controllers.OWNER, "all"]);
      handleClose();
      successSnackbar(t(`${tName}.message.${owner?.isBlocked ? "unblock" : "block"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
    setLoading(false);
  };

  return (
    <Dialog open={!!owner} onClose={handleClose}>
      <Stack width={500} maxWidth="100%">
        <DialogTitle onClose={handleClose}>
          {t(`${tName}.${owner?.isBlocked ? "unblock" : "block"}`)}
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
              bgcolor: owner?.isBlocked ? "success.main" : "error.main",
              color: "white",
              "&:hover": {
                bgcolor: owner?.isBlocked ? "success.main" : "error.main",
                color: "white",
              },
              px: 2,
            }}
          >
            {t(`generic.${owner?.isBlocked ? "unblock" : "block"}`)}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};
export default OwnerBlock;
