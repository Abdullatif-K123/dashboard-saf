import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Select, SelectProps } from "components/selects/Select";
import useNumberEnumSearchParam from "hooks/useNumberEnumSearchParam";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { PageSize } from "types/api";
import { enumToNumberArray } from "utils/transforms";

type Props = SelectProps;

const PageSizeSelect = ({ size = "small", ...props }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "customer" });
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = useNumberEnumSearchParam<PageSize>("ps") ?? "";

  const onChangeHandler = (e: SelectChangeEvent<any>) => {
    const newPageSize = e.target.value;
    searchParams.set("ps", newPageSize);
    searchParams.set("p", "0");
    setSearchParams(searchParams, { replace: true });
  };

  const handleClear = () => {
    searchParams.delete("ps");
    setSearchParams(searchParams);
  };

  const arr = enumToNumberArray(PageSize);
  return (
    <Select
      value={pageSize}
      onClear={handleClear}
      onChange={onChangeHandler}
      label={t("pageSize")}
      size={size}
      {...props}
    >
      {arr.map((item) => (
        <MenuItem value={item} key={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PageSizeSelect;
