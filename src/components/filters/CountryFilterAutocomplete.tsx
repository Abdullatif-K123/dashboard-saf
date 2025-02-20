import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { CountrySelect } from "../../API/country/type";
import TextField from "../Inputs/TextField";
import CountryAutocomplete from "../selects/CountryAutocomplete";
type Props = {
  label: string;
};
const CountryFilterAutocomplete: FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get("country");

  const value = (country && JSON.parse(country)) ?? null;
  const handleChange = (country: CountrySelect | null) => {
    searchParams.delete("city");
    if (country) {
      searchParams.set("country", JSON.stringify(country));
    } else {
      searchParams.delete("country");
    }
    setSearchParams(searchParams);
  };
  return (
    <CountryAutocomplete
      value={value}
      size="small"
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
export default CountryFilterAutocomplete;
