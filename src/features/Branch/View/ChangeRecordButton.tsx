import { Tooltip } from "@mui/material";
import { PermissionName } from "API/permissions/type";
import RecordTypeColored from "components/typography/RecordTypeColored";
import { RecordType } from "constants/enums";
import { useRoleContext } from "context/RolePermissionsContext";
import { useTranslation } from "react-i18next";

type Props = {
  type: RecordType;
  onClick: () => void;
};

const ChangeRecordButton = ({ type, onClick }: Props) => {
  const { t } = useTranslation();
  const { hasEditPermission } = useRoleContext();
  if (hasEditPermission(PermissionName.Branch)) {
    return (
      <Tooltip title={t("branch.changeRecord")}>
        <RecordTypeColored clickable recordType={type} onClick={onClick} />
      </Tooltip>
    );
  }
  return <RecordTypeColored recordType={type} />;
};

export default ChangeRecordButton;
