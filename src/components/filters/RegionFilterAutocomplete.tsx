import usePrevious from "hooks/usePrevious";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CitySelect } from "../../API/city/type";
import { CountrySelect } from "../../API/country/type";
import { RegionSelect } from "../../API/region/type";
import useObjectSearchParam from "../../hooks/useObjectSearchParam";
import TextField from "../Inputs/TextField";
import RegionAutocomplete from "../selects/RegionAutocomplete";
type Props = {
  label: string;
};
const RegionFilterAutocomplete: FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const countryId = useObjectSearchParam<CountrySelect>("country")?.id ?? null;
  const cityId = useObjectSearchParam<CitySelect>("city")?.id ?? null;
  const prevCityId = usePrevious(cityId);
  const region = useObjectSearchParam<RegionSelect>("region");

  const handleChange = (region: RegionSelect | null) => {
    if (region) {
      searchParams.set("region", JSON.stringify(region));
    } else {
      searchParams.delete("region");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (cityId !== prevCityId && prevCityId !== undefined) {
      setSearchParams((searchParams) => {
        searchParams.delete("region");
        return searchParams;
      });
    }
  }, [cityId, prevCityId, setSearchParams]);
  return (
    <RegionAutocomplete
      cityId={cityId}
      countryId={countryId}
      value={region}
      size="small"
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
export default RegionFilterAutocomplete;
