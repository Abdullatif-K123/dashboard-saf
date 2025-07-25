import { yupResolver } from "@hookform/resolvers/yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Fade, Grid, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import accountAPI from "API/account/api";
import accountQueries from "API/account/queries";
import { AccountActionBody } from "API/account/type";
import PasswordInput from "components/Inputs/PasswordInput";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import UsernameInput from "components/Inputs/UsernameInput";
import Submit from "components/buttons/Submit";
import Loading from "components/feedback/Loading";
import DialogTitle from "components/forms/DialogTitle";
import { RolesAutocompleteControlled } from "components/selects/RolesAutocomplete";
import controllers from "constants/controllers";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import accountActionSchema, { accountActionDefault } from "./validation";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
import permissionsQueries from "API/permissions/queries";
type Props = {};
const AccountAction: FC<Props> = ({}) => {
  const tName = "account";
  const { t } = useTranslation();
  const { isActive, isEdit, clearActionParams, id } = useActionSearchParams();
  const { hasAddPermission, hasEditPermission } = useRoleContext();

  const { data, isLoading } = accountQueries.useQuery(id);
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<AccountActionBody>({
    resolver: yupResolver(accountActionSchema),
    defaultValues: accountActionDefault,
  });

  const queryClient = useQueryClient();
  const handleClose = () => {
    clearActionParams();
    reset(accountActionDefault);
  };

  // Firing...
  const onSubmit = async (data: AccountActionBody) => {
    const transformedData = {
      ...data,
      roles: data.roles.map((role) => role.roleId),
    };
    console.log(data);
    try {
      await accountAPI.action(transformedData);
      queryClient.invalidateQueries([controllers.CpUser, "all"]);
      queryClient.invalidateQueries([controllers.CpUser, id]);
      handleClose();
      successSnackbar(t(`${tName}.message.${isEdit ? "edit" : "add"}`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
      setValue("password", "");
    }
  }, [data, reset, setValue]);

  if (isEdit && !hasEditPermission(PermissionName.Account)) {
    return null;
  }
  if (!isEdit && !hasAddPermission(PermissionName.Account)) {
    return null;
  }

  const { data: permissionData } =
    permissionsQueries.useGetRoleSelectPermissions();
  console.log(permissionData);

  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"md"}>
      <Fade in={isActive} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t(`${tName}.${isEdit ? "edit" : "add"}`)}
        </DialogTitle>
      </Fade>
      <DialogContent>
        {isLoading && isEdit && (
          <Stack alignItems={"center"}>
            <Loading />
          </Stack>
        )}
        {(!isLoading || !isEdit) && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} my={1}>
              <Grid item xs={12} md={6}>
                <TextFieldControlled
                  control={control}
                  name="firstName"
                  label={t(`${tName}.firstName`)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldControlled
                  control={control}
                  name="lastName"
                  label={t(`${tName}.lastName`)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UsernameInput control={control} name="userName" required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldControlled
                  control={control}
                  required
                  name="phoneNumber"
                  label={t(`${tName}.phoneNumber`)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PasswordInput
                  control={control}
                  name="password"
                  required={!isEdit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RolesAutocompleteControlled
                  name="roles"
                  control={control}
                  required
                  data={permissionData}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
                <Submit isSubmitting={isSubmitting} />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default AccountAction;
