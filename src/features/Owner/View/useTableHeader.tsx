import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const tName = "owner";
  const { t } = useTranslation();
  return [
    t(`${tName}.name`),
    t(`${tName}.branchesNumber`),
    t(`${tName}.phoneNumber`),
    t(`${tName}.creationDate`),
    t(`${tName}.recordType`),
    t(`generic.action`),
  ];
};

export default useTableHeader;
