import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "tour.reservation" });

  return [
    t("customerName"),
    t("customerPhoneNumber"),
    t("firstName"),
    t("lastName"),
    t("gender"),
    t("phoneNumber"),
    t("nationalNumber"),
    t("chairNumber"),
    t("code"),
    t("isPaid"),
    t("bookingType"),
  ];
};

export default useTableHeader;
