import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import regionAPI from "API/region/api";
import regionQueries from "API/region/queries";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import ActionForm from "components/forms/ActionForm";
import DialogTitle from "components/forms/DialogTitle";
import CityAutocompleteControlled from "components/selects/CityAutocompleteControlled";
import CountryAutocompleteControlled from "components/selects/CountryAutocompleteControlled";
import controllers from "constants/controllers";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { regionDetailsToForm, regionFormToBody } from "./helpers";
import { RegionActionForm } from "./type";
import regionActionSchema, { regionActionDefault } from "./validation";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
type Props = {};
const RegionAction: FC<Props> = ({}) => {
  const tName = "region";
  const { t } = useTranslation();
  const { clearActionParams, id, isActive, isEdit } = useActionSearchParams();
  const { data, isLoading } = regionQueries.useQuery(id);
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<RegionActionForm>({
    resolver: yupResolver(regionActionSchema),
    defaultValues: regionActionDefault,
  });
  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const handleClose = () => {
    clearActionParams();
    reset(regionActionDefault);
  };
  const onSubmit = async (data: RegionActionForm) => {
    try {
      const body = regionFormToBody(data);
      await regionAPI.action(body);
      queryClient.invalidateQueries([controllers.REGION, "all"]);
      queryClient.invalidateQueries([controllers.REGION, id]);
      handleClose();
      successSnackbar(t(`${tName}.message.${isEdit ? "edit" : "add"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };
  useEffect(() => {
    if (data) {
      reset(regionDetailsToForm(data));
    }
  }, [data, reset]);

  const { hasAddPermission, hasEditPermission } = useRoleContext();
  if (isEdit && !hasEditPermission(PermissionName.Region)) {
    return null;
  }
  if (!isEdit && !hasAddPermission(PermissionName.Region)) {
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
              <Grid item xs={12} md={6}>
                <CountryAutocompleteControlled
                  control={control}
                  label={t(`${tName}.countryName`)}
                  name={"country"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CityAutocompleteControlled
                  control={control}
                  label={t(`${tName}.cityName`)}
                  name={"city"}
                  countryId={watch("country")?.id ?? null}
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
export default RegionAction;
