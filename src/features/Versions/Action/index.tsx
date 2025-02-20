import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import versionAPI from "API/version/api";

import { VersionActionType } from "API/version/type";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import ActionForm from "components/forms/ActionForm";
import DialogTitle from "components/forms/DialogTitle";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { useTranslation } from "react-i18next";
import { versionActionDefault, versionActionSchema } from "./validation";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "constants/controllers";

type Props = {};

const VersionAction: FC<Props> = () => {
  const tName = "version";
  const { t } = useTranslation(undefined, { keyPrefix: "settings" });
  const { clearActionParams, id, isActive, isEdit } = useActionSearchParams();
  //   const { data, isLoading } = versionQueries.useQuery(id);
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VersionActionType>({
    resolver: yupResolver(versionActionSchema),
    defaultValues: versionActionDefault,
  });
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useAxiosErrorSnackbar();

  const handleClose = () => {
    clearActionParams();
    reset(versionActionDefault);
  };

  const onSubmit = async (data: VersionActionType) => {
    try {
      await versionAPI.action(data);
      queryClient.invalidateQueries([controllers.VERSION, "all"]);
      handleClose();
      successSnackbar(t(`${tName}.message.${isEdit ? "edit" : "add"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };

  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <Fade in={isActive} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t(`${tName}.${isEdit ? "edit" : "add"}`)}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <ActionForm isEdit={isEdit} isLoading={false}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} my={1}>
              <Grid item xs={12}>
                <TextFieldControlled
                  control={control}
                  name="currentVersion"
                  label={t(`${tName}.currentVersionLabel`)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldControlled
                  control={control}
                  name="minimumVersion"
                  label={t(`${tName}.minimumVersionLabel`)}
                  required
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
                <Submit isSubmitting={isSubmitting} />
              </Grid>
            </Grid>
          </form>
        </ActionForm>
      </DialogContent>
    </Dialog>
  );
};

export default VersionAction;
