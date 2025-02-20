import { FC } from "react";
import { Control } from "react-hook-form";
import AutocompleteControl from "./AutocompleteControl";
import CityAutocomplete from "./CityAutocomplete";
type Props = {
  name: string;
  control: Control<any>;
  label: string;
  countryId: string | null;
  required?: boolean;
};
const CityAutocompleteControlled: FC<Props> = ({
  name,
  control,
  label,
  countryId,
  required = false,
}) => {
  return (
    <AutocompleteControl control={control} label={label} name={name} required={required}>
      <CityAutocomplete countryId={countryId} />
    </AutocompleteControl>
  );
};
export default CityAutocompleteControlled;
