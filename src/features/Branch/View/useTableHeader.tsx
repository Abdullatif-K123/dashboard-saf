import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const tName = "branch";
  const { t } = useTranslation();

  return [
    t(`${tName}.name`),
    t(`${tName}.phoneNumber`),
    t(`${tName}.landLineNumber`),
    t(`${tName}.location`),
    t(`${tName}.owner`),
    t(`${tName}.toursCount`),
    t(`${tName}.creationDate`),
    t(`${tName}.recordType`),
    t("generic.action"),
  ];
};

export default useTableHeader;
