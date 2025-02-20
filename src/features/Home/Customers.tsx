import { Box, Fade, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HomeCustomer } from "API/home/type";
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
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";
export type CustomersProps = { data: HomeCustomer[] };
export const Customers: FC<CustomersProps> = ({ data }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "home.customer" });
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
        {headTitles.map((col) => (
          <Typography key={col}>{col}</Typography>
        ))}
      </Head>
      <List>
        {!isLoading &&
          data.map((customer, index) => (
            <Fade in={true} key={customer.id} timeout={500 * index + 3000}>
              <Row>
                <Box>{customer.name}</Box>
                <Stack alignItems={"center"}>
                  <LTR sx={{ m: "auto", width: "fit-content" }}>
                    {customer.phoneNumber}
                  </LTR>
                </Stack>
                <Box>
                  <GenderText gender={customer.gender} />
                </Box>
                {hasViewPermission && (
                  <Box>
                    <ShowIconButton
                      onClick={() =>
                        navigate(`/customers?id=${customer.id}&mode=details`)
                      }
                    />
                  </Box>
                )}
              </Row>
            </Fade>
          ))}
        {isLoading && <SkeletonRows fadeOffset={3000} />}
      </List>
    </Paper>
  );
};
export default Customers;
