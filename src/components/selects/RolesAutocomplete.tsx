import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextField from "../Inputs/TextField";
import { NewRole } from "API/permissions/type";

interface ControlledProps {
  control: Control<any>;
  name: string;
  required?: boolean;
  data?: NewRole[]; // Changed to array of userRole
}

export function RolesAutocompleteControlled({
  control,
  name,
  required = false,
  data,
}: ControlledProps) {
  const { t } = useTranslation();
  console.log(data);
  // Prepare options based on whether we have data or use enum fallback
  const options = data;

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
                  ? { roleName: val } // Handle case where value is just string (from enum)
                  : val // Keep as is if it's already an object
            )
          : [];
        console.log(value);
        return (
          <Autocomplete
            options={options ?? []}
            getOptionLabel={(option) => option.roleName}
            value={value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            isOptionEqualToValue={(option, value) =>
              option.roleName ===
              (typeof value === "string" ? value : value?.roleName)
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
