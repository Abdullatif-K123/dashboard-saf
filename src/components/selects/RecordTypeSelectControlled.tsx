import { FormHelperText } from "@mui/material";
import { RecordType } from "constants/enums";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import SelectEnum from "./SelectEnum";
type Props = {
  name: string;
  control: Control<any>;
  label: string;
};
const RecordTypeSelectControlled: FC<Props> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <SelectEnum
            _enum={RecordType}
            translationPrefix="enum.RecordType"
            label={label}
            onChange={field.onChange}
            error={!!error}
            value={field.value}
            size="medium"
          />
          {error && (
            <FormHelperText sx={{ ml: 1 }} error={true}>
              {error?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
export default RecordTypeSelectControlled;
