import { TextField, TextFieldProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

function validatePageNumber(num: string | number) {
  return !num || isNaN(Number(num)) || Number(num) < 0
    ? 0
    : Math.floor(Number(num));
}

const PageNumberInput = (props: TextFieldProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "customer" });
  const [searchParams, setSearchParams] = useSearchParams();
  const p = searchParams.get("p");
  const initialNum = p ? validatePageNumber(p) + 1 : 0;

  const onChangeHandler = (num: string) => {
    const pNum = validatePageNumber(num);
    if (pNum !== 0) {
      searchParams.set("p", `${pNum - 1}`);
    } else {
      searchParams.delete("p");
    }
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <TextField
      label={t("pageNumber")}
      type="number"
      value={`${initialNum === 0 ? "" : initialNum}`}
      onChange={(e) => onChangeHandler(e.target.value)}
      size={"small"}
      fullWidth
      {...props}
    />
  );
};
export default PageNumberInput;
