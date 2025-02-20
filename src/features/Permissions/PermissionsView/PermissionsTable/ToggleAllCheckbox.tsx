import { FormControlLabel, Checkbox } from "@mui/material";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";
import usePermissionsContext from "features/Permissions/context/permissions-context";
import { useState } from "react";
import { styled } from "@mui/material/styles";

type Props = {
  label: string;
};

const CustomCheckbox = styled(Checkbox)(() => ({
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  color: "white",
}));

const ToggleAllCheckbox = ({ label }: Props) => {
  const [checked, setChecked] = useState(false);
  const { toggleGlobal } = usePermissionsContext();
  const { hasEditPermission, hasAddPermission } = useRoleContext();
  const viewOnly =
    !hasEditPermission(PermissionName.Permission) &&
    !hasAddPermission(PermissionName.Permission);

  if (viewOnly) return <>{label}</>;

  const handleChange = () => {
    setChecked((prev) => {
      toggleGlobal(!prev);
      return !prev;
    });
  };
  return (
    <FormControlLabel
      label={label}
      control={<CustomCheckbox checked={checked} onChange={handleChange} />}
    />
  );
};

export default ToggleAllCheckbox;
