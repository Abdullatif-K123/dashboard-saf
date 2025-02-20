import { SelectChangeEvent } from "@mui/material";
import { SelectProps } from "components/selects/Select";
import SelectEnum from "components/selects/SelectEnum";
import { TourStatus } from "constants/enums";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
type Props = SelectProps;
const TourStatusFilter: FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tourStatusString = searchParams.get("tourStatus");
  const tourStatus = tourStatusString ? (Number(tourStatusString) as TourStatus) : "";
  const handleRecordChange = (e: SelectChangeEvent<any>) => {
    searchParams.set("tourStatus", e.target.value);
    setSearchParams(searchParams);
  };
  const handleClear = () => {
    searchParams.delete("tourStatus");
    setSearchParams(searchParams);
  };
  return (
    <SelectEnum
      onClear={handleClear}
      _enum={TourStatus}
      onChange={handleRecordChange}
      value={tourStatus}
      translationPrefix="enum.TourStatus"
      size="small"
      {...props}
    />
  );
};
export default TourStatusFilter;
