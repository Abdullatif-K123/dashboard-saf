import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DividedStack from "components/layout/DividedStack";
import LabelValue from "components/typography/LabelValue";
import { Stack } from "@mui/material";
import versionQueries from "API/version/queries";
import Skeleton from "components/feedback/Skeleton";
import DialogTitle from "components/forms/DialogTitle";
import { LoadingProvider } from "context/loadingContext";
import useDetailsSearchParams from "hooks/useDetailsSearchParams";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const VersionDetails: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "settings.version" });
  const { id, isActive, clearDetailsParams } = useDetailsSearchParams();
  const { data, isInitialLoading, isSuccess } =
    versionQueries.useDetailsQuery(id);

  const handleClose = () => {
    clearDetailsParams();
  };
  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"sm"}>
      <DialogTitle onClose={handleClose} fontSize={30} color="primary">
        {t("title")}
      </DialogTitle>
      <DialogContent>
        {(isSuccess || isInitialLoading) && (
          <LoadingProvider value={isInitialLoading}>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "start",
              }}
              gap={4}
            >
              <DividedStack
                flex={1}
                gap={2}
                sx={{
                  "& > * ": {
                    flexBasis: { xs: "100%" },
                    flexGrow: 1,
                  },
                  "& *": {
                    justifyContent: "space-between",
                  },
                }}
              >
                <LabelValue
                  label={t("currentVersionLabel")}
                  sx={{ flexBasis: { xs: "100%" } }}
                >
                  {data?.data.currentVersion || <Skeleton />}
                </LabelValue>
                <LabelValue label={t("minimumVersionLabel")}>
                  {data?.data.minimumVersion || <Skeleton />}
                </LabelValue>
              </DividedStack>
            </Stack>
          </LoadingProvider>
        )}
        {isInitialLoading && (
          <Stack>
            <Skeleton widthRange={{ min: 35, max: 40 }} sx={{ mx: "auto" }} />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VersionDetails;
