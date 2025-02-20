import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation();
  return [
    t("settings.version.currentVersionLabel"),
    t("settings.version.minimumVersionLabel"),
    t("generic.action"),
  ];
};

export default useTableHeader;
