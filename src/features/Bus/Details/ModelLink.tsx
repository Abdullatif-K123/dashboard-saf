import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Model } from "API/model/type";
import { Bus } from "features/Model/View/Bus";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";

type Props = { model: Omit<Model, "busCount"> };

const ModelLink = ({ model }: Props) => {
  const permissionName = PermissionName.Model;

  const { hasEditPermission } = useRoleContext();

  const content = (
    <>
      <Typography
        sx={{
          color: "secondary.main",
          textAlign: "center",
          maxWidth: 90,
          mx: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {model.name}
      </Typography>
      <Bus model={model} />
    </>
  );

  if (hasEditPermission(permissionName)) {
    return (
      <Stack
        component={Link}
        to={`/models?id=${model.id}&mode=edit`}
        sx={{
          textDecoration: "none",
          ml: 3,
        }}
      >
        {content}
      </Stack>
    );
  }
  return (
    <Stack
      sx={{
        ml: 3,
      }}
    >
      {content}
    </Stack>
  );
};

export default ModelLink;
