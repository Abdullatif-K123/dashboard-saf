import { PermissionName } from "API/permissions/type";
import EditIconButton from "components/buttons/EditIconButton";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ShowIconButton from "components/buttons/ShowIconButton";
import { useRoleContext } from "context/RolePermissionsContext";
import useEventSearchParams from "hooks/useEventSearchParams";

type Props = {
  id: string;
};

const ActionButton = ({ id }: Props) => {
  const { edit, remove } = useEventSearchParams();
  const { hasEditPermission, hasAddPermission } = useRoleContext();
  const viewOnly =
    !hasEditPermission(PermissionName.Permission) &&
    !hasAddPermission(PermissionName.Permission);
  if (viewOnly) {
    return <ShowIconButton onClick={() => edit(id)} />;
  }
  return (
    <>
      <EditIconButton onClick={() => edit(id)} />
      <RemoveIconButton onClick={() => remove(id)} />
    </>
  );
};

export default ActionButton;
