import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DividedStack from "components/layout/DividedStack";
import LabelValue from "components/typography/LabelValue";

import { Stack } from "@mui/material";
import busQueries from "API/bus/queries";
import Skeleton from "components/feedback/Skeleton";
import DialogTitle from "components/forms/DialogTitle";
import BackendImage from "components/icons/BackendImage";
import { ASPECT_RATIOS } from "constants/aspectRatios";
import { LoadingProvider } from "context/loadingContext";
import { Bus } from "features/Model/View/Bus";
import useDetailsSearchParams from "hooks/useDetailsSearchParams";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import ModelLink from "features/Bus/Details/ModelLink";

type Props = {};

const BusDetails: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "bus.details" });
  const { id, isActive, clearDetailsParams } = useDetailsSearchParams();
  const { data, isInitialLoading, isSuccess } = busQueries.useDetailsQuery(id);
  const handleClose = () => {
    clearDetailsParams();
  };
  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"md"}>
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
                flex={2}
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
                  label={t("name")}
                  sx={{ flexBasis: { xs: "100%" } }}
                >
                  {data?.name}
                </LabelValue>
                <LabelValue label={t("number")}>{data?.number}</LabelValue>
                <LabelValue label={t("chairCount")}>
                  {data?.chairCount}
                </LabelValue>
                <LabelValue label={t("branchName")}>
                  {data?.branchName}
                </LabelValue>
                <LabelValue label={t("ownerName")}>
                  {data?.ownerName}
                </LabelValue>
              </DividedStack>
              <Stack direction={"row"} flex={2}>
                <Stack
                  flex={1}
                  direction={"column"}
                  gap={1}
                  justifyContent="center"
                  flexWrap={"wrap"}
                >
                  <LabelValue
                    label={t("busPhotoUrl")}
                    sx={{ flexBasis: "48%" }}
                    skeletonProps={{
                      variant: "rectangular",
                      widthRange: undefined,
                      sx: {
                        aspectRatio: ASPECT_RATIOS.BUS,
                      },
                    }}
                    direction="column"
                    alignItems={"center"}
                    noColon
                  >
                    <BackendImage
                      sx={{
                        aspectRatio: ASPECT_RATIOS.BUS,
                        objectFit: "cover",
                      }}
                      url={data?.busPhotoUrl}
                    />
                  </LabelValue>
                  <LabelValue
                    label={t("platePhotoUrl")}
                    sx={{ flexBasis: "48%" }}
                    direction="column"
                    alignItems={"center"}
                    skeletonProps={{
                      variant: "rectangular",
                      widthRange: undefined,
                      sx: { aspectRatio: ASPECT_RATIOS.BUS },
                    }}
                    noColon
                  >
                    <BackendImage
                      sx={{
                        aspectRatio: ASPECT_RATIOS.BUS,
                        objectFit: "cover",
                      }}
                      url={data?.platePhotoUrl}
                    />
                  </LabelValue>
                </Stack>
                {data && <ModelLink model={data.model} />}
                {isInitialLoading && (
                  <Stack>
                    <Skeleton
                      widthRange={{ min: 35, max: 40 }}
                      sx={{ mx: "auto" }}
                    />
                    <Bus skeleton />
                  </Stack>
                )}
              </Stack>
            </Stack>
          </LoadingProvider>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default BusDetails;
