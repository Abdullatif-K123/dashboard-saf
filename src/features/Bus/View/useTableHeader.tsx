import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const tName = "bus";
  const { t } = useTranslation();

  return [
    t(`${tName}.name`),
    t(`${tName}.number`),
    t(`${tName}.chairCount`),
    t(`${tName}.branchName`),
    t(`${tName}.location`),
    t(`${tName}.ownerName`),
    t(`${tName}.ownerPhoneNumber`),
    t("generic.action"),
  ];
};

export default useTableHeader;
