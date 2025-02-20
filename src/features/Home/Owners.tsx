import { Box, Fade, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HomeOwner } from "API/home/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import LTR from "components/layout/LTR";
import GenderText from "components/typography/GenderText";
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
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";

export type OwnersProps = { data: HomeOwner[] };
export const Owners: FC<OwnersProps> = ({ data }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "home.owner" });
  const navigate = useNavigate();
  const isLoading = useLoadingContext();
  const { hasPermission } = useRoleContext();
  const hasViewPermission = hasPermission(PermissionName.Branch);
  const headTitles = [t("name"), t("phoneNumber"), t("gender")];
  if (hasViewPermission) headTitles.push(t("more"));
  return (
    <Paper>
      <Title>{t("title")}</Title>
      <Head>
        {[t("name"), t("phoneNumber"), t("gender"), t("more")].map((col) => (
          <Typography key={col}>{col}</Typography>
        ))}
      </Head>
      <List>
        {!isLoading &&
          data.map((owner, index) => (
            <Fade in={true} key={owner.id} timeout={500 * index + 2000}>
              <Row>
                <Box>{owner.name}</Box>
                <Stack alignItems={"center"}>
                  <LTR sx={{ m: "auto", width: "fit-content" }}>
                    {owner.phoneNumber}
                  </LTR>
                </Stack>
                <Box>
                  <GenderText gender={owner.gender} />
                </Box>
                {hasViewPermission && (
                  <Box>
                    <ShowIconButton
                      onClick={() =>
                        navigate(`/owners?id=${owner.id}&mode=details`)
                      }
                    />
                  </Box>
                )}
              </Row>
            </Fade>
          ))}
        {isLoading && <SkeletonRows fadeOffset={2000} />}
      </List>
    </Paper>
  );
};
export default Owners;
