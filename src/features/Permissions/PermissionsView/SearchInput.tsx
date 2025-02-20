import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextFieldProps } from "@mui/material";
import DebouncedTextField from "components/Inputs/DebouncedTextField";
import usePermissionsContext from "features/Permissions/context/permissions-context";

type Props = TextFieldProps;

const SearchInput = (props: Props) => {
  const { setQuery } = usePermissionsContext();

  return (
    <DebouncedTextField
      initial={""}
      clearable
      setDebounced={setQuery}
      size={"small"}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
export default SearchInput;
