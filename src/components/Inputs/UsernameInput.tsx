import PersonIcon from "@mui/icons-material/Person";
import { InputAdornment } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import TextFieldControlled, { TextFieldControlledProps } from "./TextFieldControlled";
type Props = {} & TextFieldControlledProps;
const UsernameInput: FC<Props> = ({ control, name, ...props }) => {
  const { t } = useTranslation();
  return (
    <TextFieldControlled
      name={name}
      variant="outlined"
      control={control}
      label={t("account.userName")}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default UsernameInput;
