import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const tName = "tour";
  const { t } = useTranslation();

  return [
    t(`${tName}.name`),
    t(`${tName}.ownerName`),
    t(`${tName}.branchName`),
    t(`${tName}.customersCount`),
    t(`${tName}.chairPrice`),
    t(`${tName}.tourStatus`),
    t("generic.action"),
  ];
};

export default useTableHeader;
