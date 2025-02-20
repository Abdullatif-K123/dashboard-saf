import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import cityAPI from "API/city/api";
import cityQueries from "API/city/queries";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import ActionForm from "components/forms/ActionForm";
import DialogTitle from "components/forms/DialogTitle";
import CountryAutocompleteControlled from "components/selects/CountryAutocompleteControlled";
import controllers from "constants/controllers";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MapDialog, { Position } from "./MapDialog";
import { cityDetailsToForm, cityFormToBody } from "./helpers";
import { CityActionForm } from "./type";
import cityActionSchema, { cityActionDefault } from "./validation";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
type Props = {};
const CityAction: FC<Props> = ({}) => {
  const { t } = useTranslation();
  const tName = "city";
  const { clearActionParams, id, isActive, isEdit } = useActionSearchParams();
  const { data, isLoading } = cityQueries.useQuery(id);
  const {
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CityActionForm>({
    resolver: yupResolver(cityActionSchema),
    defaultValues: cityActionDefault,
  });
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const queryClient = useQueryClient();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const handleClose = () => {
    clearActionParams();
    reset(cityActionDefault);
  };
  const onSubmit = async (form: CityActionForm) => {
    try {
      const body = cityFormToBody(form);
      await cityAPI.action(body);
      queryClient.invalidateQueries([controllers.CITY, "all"]);
      queryClient.invalidateQueries([controllers.CITY, id]);
      handleClose();
      successSnackbar(t(`${tName}.message.${isEdit ? "edit" : "add"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };
  const handlePositionChange = ({ x, y }: Position) => {
    setValue("longitude", y);
    setValue("latitude", x);
  };
  useEffect(() => {
    if (data) {
      reset(cityDetailsToForm(data));
    }
  }, [data, reset]);

  const { hasAddPermission, hasEditPermission } = useRoleContext();
  if (isEdit && !hasEditPermission(PermissionName.City)) {
    return null;
  }
  if (!isEdit && !hasAddPermission(PermissionName.City)) {
    return null;
  }

  return (
    <>
      <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <Fade in={isActive} timeout={0}>
          <DialogTitle onClose={handleClose} fontSize={30} color="primary">
            {t(`${tName}.${isEdit ? "edit" : "add"}`)}
          </DialogTitle>
        </Fade>
        <DialogContent>
          <ActionForm isEdit={isEdit} isLoading={isLoading}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                my={1}
                direction={"row"}
                spacing={1}
                alignItems="start"
              >
                <Grid item xs={12}>
                  <TextFieldControlled
                    control={control}
                    name="name"
                    label={t(`${tName}.name`)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CountryAutocompleteControlled
                    control={control}
                    label={t(`${tName}.countryName`)}
                    name={"country"}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldControlled
                    InputProps={{ readOnly: true }}
                    type="number"
                    control={control}
                    label={t(`${tName}.latitude`)}
                    name={"latitude"}
                    onClick={() => setIsMapOpen(true)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldControlled
                    InputProps={{ readOnly: true }}
                    control={control}
                    label={t(`${tName}.longitude`)}
                    name={"longitude"}
                    onClick={() => setIsMapOpen(true)}
                  />
                </Grid>
                <Grid item xs={12} justifyContent="center" display="flex">
                  <Submit isSubmitting={isSubmitting} />
                </Grid>
              </Grid>
            </form>
          </ActionForm>
        </DialogContent>
      </Dialog>
      <MapDialog
        key={watch("longitude")}
        initialPosition={{ x: watch("latitude"), y: watch("longitude") }}
        onPositionSave={handlePositionChange}
        open={isMapOpen}
        setOpen={setIsMapOpen}
      />
    </>
  );
};
export default CityAction;
