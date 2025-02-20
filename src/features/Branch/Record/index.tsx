import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import branchAPI from "API/branch/api";
import { Branch, BranchChangeRecordParams, RecordType } from "API/branch/type";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import ActionForm from "components/forms/ActionForm";
import DialogTitle from "components/forms/DialogTitle";
import RecordTypeSelectControlled from "components/selects/RecordTypeSelectControlled";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import branchRecordSchema, { branchRecordDefault } from "./validation";
type Props = {
  branch: Branch | null;
  onClose: () => void;
};
const BranchRecord: FC<Props> = ({ branch, onClose }) => {
  const tName = "branch";
  const { t } = useTranslation();
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<BranchChangeRecordParams>({
    resolver: yupResolver(branchRecordSchema),
    defaultValues: branchRecordDefault,
  });

  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const handleClose = () => {
    onClose();
  };
  const onSubmit = async (params: BranchChangeRecordParams) => {
    try {
      await branchAPI.changeRecord({ ...params, branchId: branch?.id ?? "" });
      queryClient.invalidateQueries([controllers.BRANCH, "all"]);

      handleClose();
      successSnackbar(t(`${tName}.message.record`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };
  useEffect(() => {
    if (branch) {
      reset({ branchId: branch.id, recordType: branch.recordType });
    }
  }, [branch, reset]);
  return (
    <Dialog open={!!branch} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <Fade in={!!branch} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t(`${tName}.record`, { name: branch?.name })}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <ActionForm isEdit={false} isLoading={false}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} my={1}>
              <Grid item xs={12} md={12}>
                <RecordTypeSelectControlled
                  control={control}
                  label={t(`${tName}.recordType`)}
                  name={"recordType"}
                />
              </Grid>
              {watch("recordType") === RecordType.Rejected && (
                <Grid item xs={12}>
                  <TextFieldControlled
                    control={control}
                    name="rejectingReason"
                    label={t(`${tName}.rejectingReason`)}
                  />
                </Grid>
              )}
              <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
                <Submit disabled={!isDirty} isSubmitting={isSubmitting} />
              </Grid>
            </Grid>
          </form>
        </ActionForm>
      </DialogContent>
    </Dialog>
  );
};
export default BranchRecord;
