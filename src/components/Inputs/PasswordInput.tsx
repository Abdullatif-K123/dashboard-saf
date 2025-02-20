import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import TextFieldControlled, { TextFieldControlledProps } from "./TextFieldControlled";
type Props = {} & TextFieldControlledProps;
const PasswordInput: FC<Props> = ({ control, name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  return (
    <TextFieldControlled
      name={name}
      variant="outlined"
      control={control}
      label={t("account.password")}
      autoComplete={"off"}
      type={showPassword ? "text" : "password"}
      fullWidth
      onInput={(e) => {
        const input = e.target as HTMLInputElement;
        input.value = input.value.trim();
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              tabIndex={1}
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
export default PasswordInput;
