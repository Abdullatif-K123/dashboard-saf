import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Fade, FormControlLabel, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import tourQueries from "API/tour/queries";
import { TourCustomer } from "API/tour/type";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import Loading from "components/feedback/Loading";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import DialogTitle from "components/forms/DialogTitle";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import GenderRadio from "./GenderRadio";
import TourSeatSelection from "./TourChairSelection";
import { tourCustomerDetailsToForm, tourCustomerFormToBody } from "./helpers";
import { TourCustomerForm } from "./type";
import tourCustomerActionSchema, {
  tourCustomerActionDefault,
} from "./validation";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";
type Props = {
  data: TourCustomer | null;
  tourId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};
const Action: FC<Props> = ({ tourId, data, open, onClose, setOpen }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "tour.reservation" });

  const { control, setValue, handleSubmit, watch, trigger } =
    useForm<TourCustomerForm>({
      resolver: yupResolver(tourCustomerActionSchema),
      defaultValues: data
        ? tourCustomerDetailsToForm(data)
        : tourCustomerActionDefault,
    });
  const isEdit = !!data;
  const queryClient = useQueryClient();
  const action = tourQueries.useCustomerAction();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const tourQuery = tourQueries.useDetailsForCustomerQuery(tourId);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const onSubmit = async (form: TourCustomerForm) => {
    const body = tourCustomerFormToBody(form, data, tourId);
    action.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.TOUR, "reservations"]);
        handleClose();
        successSnackbar(t(`message.success.${isEdit ? "edit" : "add"}`));
      },
      onError: (err) => errorSnackbar(err),
    });
  };

  const { hasAddPermission, hasEditPermission } = useRoleContext();
  if (isEdit && !hasEditPermission(PermissionName.TourBooking)) {
    return null;
  }
  if (!isEdit && !hasAddPermission(PermissionName.TourBooking)) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
      <Fade in={open} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t(`message.${isEdit ? "edit" : "add"}`)}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            alignItems={"start"}
            justifyContent={"space-between"}
            spacing={1}
          >
            <Grid container item xs={12} md={7} spacing={1} my={1}>
              <Grid item xs={12} md={6}>
                <TextFieldControlled
                  control={control}
                  name="firstName"
                  label={t(`firstName`)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldControlled
                  control={control}
                  name="lastName"
                  label={t(`lastName`)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextFieldControlled
                  control={control}
                  name="phoneNumber"
                  label={t(`phoneNumber`)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldControlled
                  control={control}
                  name="nationalNumber"
                  label={t(`nationalNumber`)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldControlled
                  control={control}
                  name="chairNumber"
                  value={watch("chairNumber") || ""}
                  label={t(`chairNumber`)}
                  required
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <GenderRadio
                      label={t("gender")}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ mx: 0.8, width: "fit-content" }}
                  control={
                    <Checkbox
                      name="isPaid"
                      onChange={(e) => setValue("isPaid", e.target.checked)}
                      checked={watch("isPaid")}
                    />
                  }
                  label={t`isPaid`}
                />
              </Grid>
              <Grid
                justifySelf={"end"}
                item
                xs={12}
                justifyContent="center"
                display="flex"
                mt={3}
              >
                <Submit isSubmitting={action.isLoading} />
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              {tourQuery.data && (
                <TourSeatSelection
                  currentlyBookedOn={data?.chairNumber}
                  selected={watch("chairNumber")}
                  onSeatSelection={(seat) => {
                    setValue("chairNumber", seat);
                    trigger("chairNumber");
                  }}
                  tour={tourQuery.data}
                />
              )}
              {tourQuery.isLoading && <Loading sx={{ mx: "auto", mt: 10 }} />}
              {tourQuery.isError && (
                <SomethingWentWrong sx={{ mx: "auto", mt: 10 }} />
              )}
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default Action;
