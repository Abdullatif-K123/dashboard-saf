import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Select, SelectProps } from "../selects/Select";
import { PaidType } from "../../constants/enums";
import useNumberEnumSearchParam from "../../hooks/useNumberEnumSearchParam";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
  label: string;
  trueName?: string;
  falseName?: string;
} & Omit<SelectProps, "name" | "label">;

const BooleanSelect = ({
  name,
  label,
  trueName,
  falseName,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const paidType = useNumberEnumSearchParam<PaidType>(name) ?? "";

  const handleRecordChange = (e: SelectChangeEvent<any>) => {
    searchParams.set(name, e.target.value);
    setSearchParams(searchParams, { replace: true });
  };
  const handleClear = () => {
    searchParams.delete(name);
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <Select
      {...props}
      size="small"
      value={paidType}
      label={label}
      onClear={handleClear}
      onChange={handleRecordChange}
    >
      <MenuItem value={0}>{falseName ?? t("generic.no")}</MenuItem>
      <MenuItem value={1}>{trueName ?? t("generic.yes")}</MenuItem>
    </Select>
  );
};
export default BooleanSelect;
