import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation();
  return [t(`country.name`), t(`country.cityCount`), t("generic.action")];
};

export default useTableHeader;
