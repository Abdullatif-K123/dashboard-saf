import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation();
  return [t(`city.cityName`), t(`city.countryName`), t("city.regionCount"), t("generic.action")];
};

export default useTableHeader;
