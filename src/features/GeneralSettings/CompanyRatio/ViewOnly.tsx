import { Stack, TextField } from "@mui/material";
import { CompanyRatio } from "API/settings/type";
import { useTranslation } from "react-i18next";

type Props = {
  value: CompanyRatio;
};

const ViewOnly = ({ value }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "settings.general" });
  return (
    <Stack direction="row" gap={1} my={3} alignItems={"center"}>
      <TextField
        value={value.companyRatio}
        sx={{ height: 50 }}
        name="companyRatio"
        label={t(`companyRatio`)}
        type="number"
        InputProps={{ endAdornment: "SYP", readOnly: true }}
      />
      <TextField
        value={value.serviceRatio}
        sx={{ height: 50 }}
        name="serviceRatio"
        label={t(`serviceRatio`)}
        type="number"
        InputProps={{ endAdornment: "SYP", readOnly: true }}
      />
    </Stack>
  );
};

export default ViewOnly;
