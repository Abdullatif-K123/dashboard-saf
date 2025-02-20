import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation();
  return [
    t(`account.name`),
    t(`account.userName`),
    t(`account.phoneNumber`),
    t(`account.rolesName`),
    t(`generic.action`),
  ];
};

export default useTableHeader;
