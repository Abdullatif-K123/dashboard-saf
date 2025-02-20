import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const tName = "permissions";
  const { t } = useTranslation();
  return [t(`${tName}.roleName`), t(`${tName}.contents`), t(`generic.action`)];
};

export default useTableHeader;
