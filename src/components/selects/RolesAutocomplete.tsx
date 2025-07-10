import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { AdminType } from "constants/enums";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { enumToStringArray } from "../../utils/transforms";
import TextField from "../Inputs/TextField";
import { userRole } from "API/permissions/type";

interface ControlledProps {
  control: Control<any>;
  name: string;
  required?: boolean;
  data?: userRole[]; // Changed to array of userRole
}

export function RolesAutocompleteControlled({
  control,
  name,
  required = false,
  data,
}: ControlledProps) {
  const { t } = useTranslation();

  // Prepare options based on whether we have data or use enum fallback
  const options = data
    ? data
    : enumToStringArray(AdminType).map((name) => ({ name }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Convert field value to the expected format
        const value = Array.isArray(field.value)
          ? field.value.map(
              (val) =>
                typeof val === "string"
                  ? { name: val } // Handle case where value is just string (from enum)
                  : val // Keep as is if it's already an object
            )
          : [];

        return (
          <Autocomplete
            options={options}
            getOptionLabel={(option) =>
              typeof option === "string"
                ? t(`enum.AdminType.${option}`)
                : option.name
            }
            value={value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            isOptionEqualToValue={(option, value) =>
              option.name === (typeof value === "string" ? value : value?.name)
            }
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
        );
      }}
    />
  );
}
