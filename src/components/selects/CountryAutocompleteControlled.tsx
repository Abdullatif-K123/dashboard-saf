import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import TextField from "../Inputs/TextField";
import CountryAutocomplete from "./CountryAutocomplete";
type Props = {
  name: string;
  control: Control<any>;
  label: string;
  required?: boolean;
};
const CountryAutocompleteControlled: FC<Props> = ({
  name,
  control,
  label,
  required = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CountryAutocomplete
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
};
export default CountryAutocompleteControlled;
