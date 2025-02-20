import { useTranslation } from "react-i18next";

const usePermissionsNames = () => {
  const { t } = useTranslation();
  return {
    add: t("permissions.addPermission"),
    edit: t("permissions.editPermission"),
    delete: t("permissions.deletePermission"),
    view: t("permissions.viewPermission"),
    download: t("permissions.downloadPermission"),
  };
};

export default usePermissionsNames;
