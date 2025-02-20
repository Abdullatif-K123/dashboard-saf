import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { AdminType } from "constants/enums";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { enumToStringArray } from "../../utils/transforms";
import TextField from "../Inputs/TextField";
interface ControlledProps {
  control: Control<any>;
  name: string;
  required?: boolean;
}
export function RolesAutocompleteControlled({ control, name, required = false }: ControlledProps) {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={enumToStringArray(AdminType)}
          getOptionLabel={(option) => t(`enum.AdminType.${option}`)}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          disableClearable
          multiple
          renderInput={(params) => (
            <TextField
              required={required}
              {...params}
              label={t("account.rolesName")}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
}
