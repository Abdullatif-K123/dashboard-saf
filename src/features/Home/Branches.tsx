import { Box, Fade, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HomeBranch } from "API/home/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import LTR from "components/layout/LTR";
import { useLoadingContext } from "context/loadingContext";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Head } from "./Head";
import { List } from "./List";
import { Paper } from "./Paper";
import { Row } from "./Row";
import { SkeletonRows } from "./SkeletonRows";
import { Title } from "./Title";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";

export type BranchesProps = { data: HomeBranch[] };
export const Branches: FC<BranchesProps> = ({ data }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "home.branch" });
  const navigate = useNavigate();
  const isLoading = useLoadingContext();
  const { hasPermission } = useRoleContext();
  const hasViewPermission = hasPermission(PermissionName.Branch);
  const headTitles = [t("name"), t("ownerName"), t("phoneNumber")];
  if (hasViewPermission) headTitles.push(t("more"));
  return (
    <Paper>
      <Title
        sx={{
          flex: 1,
          alignItems: "center",
          minHeight: 110,
        }}
      >
        {t("title")}
      </Title>
      <Head>
        {headTitles.map((col) => (
          <Typography key={col}>{col}</Typography>
        ))}
      </Head>
      <List>
        {!isLoading &&
          data.map((branch, index) => (
            <Fade in={true} key={branch.id} timeout={index * 500 + 1000}>
              <Row>
                <Box>{branch.name}</Box>
                <Box>{branch.ownerName}</Box>
                <Stack alignItems={"center"}>
                  <LTR sx={{ m: "auto", width: "fit-content" }}>
                    {branch.phoneNumber}
                  </LTR>
                </Stack>
                {hasViewPermission && (
                  <Box>
                    <ShowIconButton
                      onClick={() =>
                        navigate(`/branches?id=${branch.id}&mode=details`)
                      }
                    />
                  </Box>
                )}
              </Row>
            </Fade>
          ))}
        {isLoading && <SkeletonRows fadeOffset={1000} />}
      </List>
    </Paper>
  );
};

export default Branches;
