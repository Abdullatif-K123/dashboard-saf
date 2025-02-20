import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation();
  return [
    t(`accounting.tourName`),
    t(`accounting.branchName`),
    t(`accounting.customerName`),
    t(`accounting.companyPrice`),
    t(`accounting.ownerPrice`),
    t(`accounting.payementType`),
  ];
};

export default useTableHeader;
