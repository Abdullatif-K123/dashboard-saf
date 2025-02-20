import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation();
  return [
    t(`accounting.tourName`),
    t(`accounting.branchName`),
    t(`accounting.tourArriveDate`),
    t(`accounting.tourLeaveDate`),
    t(`accounting.companyPrice`),
    t(`accounting.ownerPrice`),
    t(`accounting.isCompanyConfirm`),
    t(`accounting.isOwnerConfirm`),
    t(`generic.action`),
  ];
};

export default useTableHeader;
