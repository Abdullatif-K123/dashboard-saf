import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import { RecordType } from "API/branch/type";
import { CustomerUpdateRecordTypeBody } from "API/customer/type";
import ownerQueries from "API/owner/queries";
import { Owner, OwnerUpdateRecordTypeBody } from "API/owner/type";
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
import ownerRecordSchema, { customerRecordDefault } from "./validation";
type Props = {
  owner: Owner | null;
  onClose: () => void;
};
const OwnerRecord: FC<Props> = ({ owner, onClose }) => {
  const tName = "owner";
  const { t } = useTranslation();
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<CustomerUpdateRecordTypeBody>({
    resolver: yupResolver(ownerRecordSchema),
    defaultValues: customerRecordDefault,
  });

  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const changeRecord = ownerQueries.useChangeRecordType();
  const handleClose = () => {
    onClose();
  };
  const onSubmit = (body: OwnerUpdateRecordTypeBody) => {
    changeRecord.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.OWNER, "all"]);
        handleClose();
        successSnackbar(t(`${tName}.message.record`));
      },
      onError: errorSnackbar,
    });
  };
  useEffect(() => {
    if (owner) {
      reset({ cause: "", recordType: owner.recordType, userId: owner.id });
    }
  }, [owner, reset]);
  return (
    <Dialog open={!!owner} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <Fade in={!!owner} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={25} color="primary">
          {t(`${tName}.record`, { name: owner?.name })}
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
                  <TextFieldControlled control={control} name="cause" label={t(`${tName}.cause`)} />
                </Grid>
              )}
              <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
                <Submit disabled={!isDirty} isSubmitting={changeRecord.isLoading} />
              </Grid>
            </Grid>
          </form>
        </ActionForm>
      </DialogContent>
    </Dialog>
  );
};
export default OwnerRecord;
