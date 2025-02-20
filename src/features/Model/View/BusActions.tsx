import { PermissionName } from "API/permissions/type";
import EditIconButton from "components/buttons/EditIconButton";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import { useRoleContext } from "context/RolePermissionsContext";
import useEventSearchParams from "hooks/useEventSearchParams";

type Props = {
  id: string;
};

const BusActions = ({ id }: Props) => {
  const { edit, remove } = useEventSearchParams();

  const { hasEditPermission, hasDeletePermission } = useRoleContext();
  const hasEditPerm = hasEditPermission(PermissionName.Model);
  const hasDeletePerm = hasDeletePermission(PermissionName.Model);

  if (!hasDeletePerm && !hasEditPerm) {
    return null;
  }
  return (
    <ButtonsStack
      direction={"row"}
      sx={{ justifyContent: "start", mt: "auto", svg: { fontSize: 17 } }}
    >
      {hasEditPerm && <EditIconButton onClick={() => edit(id)} />}
      {hasDeletePerm && <RemoveIconButton onClick={() => remove(id)} />}
    </ButtonsStack>
  );
};

export default BusActions;
