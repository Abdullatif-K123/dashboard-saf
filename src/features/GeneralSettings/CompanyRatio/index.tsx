import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import settingsAPI from "API/settings/api";
import { CompanyRatioActionParams } from "API/settings/type";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import controllers from "constants/controllers";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import companyRatioActionSchema from "./validation";

export type CompanyRatioProps = { data: CompanyRatioActionParams };

export const CompanyRatio = ({ data }: CompanyRatioProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CompanyRatioActionParams>({
    resolver: yupResolver(companyRatioActionSchema),
    defaultValues: data,
  });
  const { t } = useTranslation("", { keyPrefix: "settings.general" });
  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const onSubmit = async (data: CompanyRatioActionParams) => {
    try {
      await settingsAPI.companyRatioAction(data);
      queryClient.invalidateQueries([controllers.SETTINGS, "companyRatio"]);
      successSnackbar(t(`message.edit`));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" gap={1} my={3} alignItems={"center"}>
        <TextFieldControlled
          sx={{ height: 50 }}
          control={control}
          name="companyRatio"
          label={t(`companyRatio`)}
          type="number"
          InputProps={{ endAdornment: "SYP" }}
        />
        <TextFieldControlled
          sx={{ height: 50 }}
          control={control}
          name="serviceRatio"
          label={t(`serviceRatio`)}
          type="number"
          InputProps={{ endAdornment: "SYP" }}
        />
        <TextFieldControlled
          sx={{ height: 50 }}
          control={control}
          name="fromOwnerRatio"
          label={t(`fromOwnerRatio`)}
          type="number"
          InputProps={{ endAdornment: "SYP" }}
        />
        <Submit isSubmitting={isSubmitting} size="small" />
      </Stack>
    </form>
  );
};
export default CompanyRatio;
