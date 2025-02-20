import { Box, Card, Fade, Stack, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { HomeData } from "API/home/type";
import Skeleton from "components/feedback/Skeleton";
import RouterLink from "components/links/RouterLink";
import { useLoadingContext } from "context/loadingContext";
import { FC, ReactNode } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import {
  ArrowIcon,
  BranchesIcon,
  CustomersIcon,
  OwnersIcon,
  ToursIcon,
} from "./icons";
import { PermissionName } from "API/permissions/type";
import { useRoleContext } from "context/RolePermissionsContext";

const sx = {
  stack: {
    gap: 2,
    width: 1,
    ">*": { flex: { xs: "100%", md: "45%", lg: 1 } },
    flexDirection: "row",
    flexWrap: "wrap",
  },
} as const satisfies SxProps;

export type CountsCardProps = { data: HomeData | undefined };
export const Counts: FC<CountsCardProps> = ({ data }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "home" });

  return (
    <Stack sx={sx.stack}>
      <CountCard
        count={data?.customerCount ?? 0}
        label={t("customerCount")}
        index={1}
        icon={<CustomersIcon />}
        href="customers"
        permission={PermissionName.Customer}
      />
      <CountCard
        count={data?.ownerCount ?? 0}
        label={t("ownerCount")}
        index={2}
        icon={<OwnersIcon />}
        href="owners"
        permission={PermissionName.Owner}
      />
      <CountCard
        count={data?.branchCount ?? 0}
        label={t("branchCount")}
        index={3}
        icon={<BranchesIcon />}
        href="branches"
        permission={PermissionName.Branch}
      />
      <CountCard
        count={data?.tourCount ?? 0}
        label={t("tourCount")}
        index={4}
        icon={<ToursIcon />}
        href="tours"
        permission={PermissionName.Tour}
      />
    </Stack>
  );
};

export type CountCardProps = {
  count: number;
  label: ReactNode;
  index: number;
  icon: ReactNode;
  href: string;
  permission: PermissionName;
};
const CountCard: FC<CountCardProps> = ({
  count,
  label,
  index,
  icon,
  href,
  permission,
}) => {
  const isLoading = useLoadingContext();
  return (
    <Fade in={true} timeout={500 * index + 500}>
      <Card elevation={1} sx={{ px: 2, pt: 2, pb: 1, borderRadius: 2 }}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack pl={1}>
            <Box>
              <Typography variant="h6" sx={{ color: "#4B465C" }}>
                {label}
              </Typography>
              <Box sx={{ fontSize: 20, pl: "10px", color: "#4B465C" }}>
                {!isLoading && (
                  <CountUp end={count} useEasing duration={index} />
                )}
                {isLoading && (
                  <Skeleton
                    sx={{ fontSize: 15 }}
                    widthRange={{ min: 27, max: 30 }}
                  />
                )}
              </Box>
            </Box>
            <CardLink permission={permission} href={href} />
          </Stack>
          <Box my="auto" sx={{ svg: { fontSize: 50, color: "primary.main" } }}>
            {icon}
          </Box>
        </Stack>
      </Card>
    </Fade>
  );
};
export default Counts;

function CardLink({
  href,
  permission,
}: {
  href: string;
  permission: PermissionName;
}) {
  const { t } = useTranslation();
  const { hasPermission } = useRoleContext();
  if (!hasPermission(permission)) {
    return null;
  }
  return (
    <RouterLink
      href={href}
      noDecoration
      sx={{
        color: "primary.main",
        "&:hover *": {
          color: "secondary.main",
          fill: (th) => th.palette.secondary.main,
        },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent="center"
        alignItems="center"
        width="max-content"
        gap={1}
        mt={1}
        ml={1}
        fontSize={9.5}
      >
        {<ArrowIcon />} {t("home.goToPage")}
      </Stack>
    </RouterLink>
  );
}
