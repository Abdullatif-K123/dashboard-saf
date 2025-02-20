import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";

type PermissionCheckboxProps = {
  checked: boolean;
  viewOnly: boolean;
  onChange: () => void;
  label?: string;
};
export function PermissionCheckbox({
  checked,
  onChange,
  viewOnly,
  label,
}: PermissionCheckboxProps) {
  if (!viewOnly && label) {
    return (
      <FormControlLabel
        label={label}
        control={<Checkbox checked={checked} onChange={onChange} />}
      />
    );
  }
  if (label) return <Typography>{label}</Typography>;
  if (viewOnly) {
    return (
      <Stack alignItems="center">
        {checked ? (
          <CheckIcon sx={{ color: "success.main" }} />
        ) : (
          <ClearIcon sx={{ color: "#c1c1c1" }} />
        )}
      </Stack>
    );
  }
  return <Checkbox color="error" checked={checked} onChange={onChange} />;
}
