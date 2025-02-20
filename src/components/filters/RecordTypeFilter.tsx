import { SelectChangeEvent } from "@mui/material";
import { SelectProps } from "components/selects/Select";
import SelectEnum from "components/selects/SelectEnum";
import useNumberEnumSearchParam from "hooks/useNumberEnumSearchParam";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { RecordType } from "../../API/branch/type";
type Props = SelectProps;
const RecordTypeFilter: FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const record = useNumberEnumSearchParam<RecordType>("recordType") ?? "";
  const handleRecordChange = (e: SelectChangeEvent<any>) => {
    searchParams.set("recordType", e.target.value);
    setSearchParams(searchParams);
  };
  const handleClear = () => {
    searchParams.delete("recordType");
    setSearchParams(searchParams);
  };
  return (
    <SelectEnum
      _enum={RecordType}
      onClear={handleClear}
      value={record}
      onChange={handleRecordChange}
      size="small"
      translationPrefix={"enum.RecordType"}
      {...props}
    />
  );
};
export default RecordTypeFilter;
