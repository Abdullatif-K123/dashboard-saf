import usePrevious from "hooks/usePrevious";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BranchSelect } from "../../API/branch/type";
import { CitySelect as OwnerSelect } from "../../API/city/type";
import useObjectSearchParam from "../../hooks/useObjectSearchParam";
import TextField from "../Inputs/TextField";
import BranchAutocomplete from "../selects/BranchAutocomplete";
type Props = {
  label: string;
  required?: boolean;
};
const BranchFilterAutocomplete: FC<Props> = ({ label, required }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const branch = useObjectSearchParam<BranchSelect>("branch") || null;
  const ownerId = useObjectSearchParam<OwnerSelect>("owner")?.id ?? null;
  const prevOwnerId = usePrevious(ownerId);
  const handleChange = (branch: BranchSelect | null) => {
    if (branch) {
      searchParams.set("branch", JSON.stringify(branch));
    } else {
      searchParams.delete("branch");
    }
    setSearchParams(searchParams);
  };
  useEffect(() => {
    if (ownerId !== prevOwnerId && prevOwnerId !== undefined) {
      setSearchParams((searchParams) => {
        searchParams.delete("branch");
        return searchParams;
      });
    }
  }, [ownerId, prevOwnerId, setSearchParams]);
  return (
    <BranchAutocomplete
      params={{ ownerId }}
      value={branch}
      size="small"
      fullWidth
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField required={required} {...params} label={label} />}
    />
  );
};
export default BranchFilterAutocomplete;
