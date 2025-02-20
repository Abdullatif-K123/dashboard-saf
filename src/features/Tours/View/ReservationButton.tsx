import { IconButton, Tooltip } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RouterLink from "components/links/RouterLink";
import { useTranslation } from "react-i18next";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";

type Props = {
  id: string;
};
const ReservationButton = ({ id }: Props) => {
  const { hasPermission } = useRoleContext();
  const { t } = useTranslation(undefined, { keyPrefix: "tour" });
  if (!hasPermission(PermissionName.TourBooking)) {
    return null;
  }
  return (
    <Tooltip title={t("reservationButton")}>
      <IconButton
        href={`${id}/reservations`}
        sx={{ ":hover": { color: "primary.main" } }}
        LinkComponent={RouterLink}
      >
        <PeopleAltIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ReservationButton;
