import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const tName = "region";
  const { t } = useTranslation();
  return [
    t(`${tName}.regionName`),
    t(`${tName}.cityName`),
    t(`${tName}.countryName`),
    t("generic.action"),
  ];
};

export default useTableHeader;
