import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { OwnerSelect } from "../../API/owner/type";
import TextField from "../Inputs/TextField";
import OwnerAutocomplete from "../selects/OwnerAutocomplete";
type Props = {
  label: string;
};
const OwnerFilterAutocomplete: FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const owner = searchParams.get("owner");

  const value = (owner && JSON.parse(owner)) ?? null;
  const handleChange = (region: OwnerSelect | null) => {
    if (region) {
      searchParams.set("owner", JSON.stringify(region));
    } else {
      searchParams.delete("owner");
    }
    setSearchParams(searchParams);
  };
  return (
    <OwnerAutocomplete
      value={value}
      size="small"
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
export default OwnerFilterAutocomplete;
