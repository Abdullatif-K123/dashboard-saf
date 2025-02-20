import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import countryAPI from "API/country/api";
import countryQueries from "API/country/queries";
import { CountryActionBody } from "API/country/type";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import ActionForm from "components/forms/ActionForm";
import DialogTitle from "components/forms/DialogTitle";
import controllers from "constants/controllers";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import countryActionSchema, { countryActionDefault } from "./validation";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";
type Props = {};
const CountryAction: FC<Props> = ({}) => {
  const tName = "country";
  const { t } = useTranslation();
  const { clearActionParams, id, isActive, isEdit } = useActionSearchParams();
  const { data, isLoading } = countryQueries.useQuery(id);
  const {
    control,
    reset,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<CountryActionBody>({
    resolver: yupResolver(countryActionSchema),
    defaultValues: countryActionDefault,
  });
  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const handleClose = () => {
    clearActionParams();
    reset(countryActionDefault);
  };
  const onSubmit = async (data: CountryActionBody) => {
    try {
      await countryAPI.action(data);
      queryClient.invalidateQueries([controllers.COUNTRY, "all"]);
      queryClient.invalidateQueries([controllers.COUNTRY, id]);
      handleClose();
      successSnackbar(t(`${tName}.message.${isEdit ? "edit" : "add"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const { hasAddPermission, hasEditPermission } = useRoleContext();
  if (isEdit && !hasEditPermission(PermissionName.Country)) {
    return null;
  }
  if (!isEdit && !hasAddPermission(PermissionName.Country)) {
    return null;
  }

  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <Fade in={isActive} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t(`${tName}.${isEdit ? "edit" : "add"}`)}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <ActionForm isEdit={isEdit} isLoading={isLoading}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} my={1}>
              <Grid item xs={12}>
                <TextFieldControlled
                  control={control}
                  name="name"
                  label={t(`${tName}.name`)}
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
export default CountryAction;
