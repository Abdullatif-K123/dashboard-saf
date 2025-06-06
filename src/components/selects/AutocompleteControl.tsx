import { AutocompleteProps, TextFieldProps } from "@mui/material";
import TextField from "components/Inputs/TextField";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
type Props = {
  name: string;
  control: Control<any>;
  label: string;
  textFieldProps?: TextFieldProps;
  required?: boolean;
  children: React.ReactElement<AutocompleteProps<any, any, any, any, any>>;
};
const AutocompleteControl: FC<Props> = ({
  name,
  control,
  label,
  required = false,
  children,
  textFieldProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        React.cloneElement(children, {
          ...children.props,
          value: field.value,
          onChange: (_, value) => field.onChange(value),
          renderInput: (params) => (
            <TextField
              {...params}
              {...textFieldProps}
              label={label}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          ),
        } as AutocompleteProps<any, any, any, any, any>)
      }
    />
  );
};
export default AutocompleteControl;
