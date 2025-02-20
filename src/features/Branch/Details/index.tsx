import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import branchQueries from "API/branch/queries";
import LabelValueSkeleton from "components/feedback/LabelValueSkeleton";
import DividedStack, { DividedStackProps } from "components/layout/DividedStack";
import RepeatELement from "components/layout/RepeatElement";
import LabelValue from "components/typography/LabelValue";

import NoData from "components/feedback/NoData";
import DialogTitle from "components/forms/DialogTitle";
import useDetailsSearchParams from "hooks/useDetailsSearchParams";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const dividedStackProps: DividedStackProps = {
  flexWrap: "wrap",
  gap: 2,
  sx: {
    "&>*": {
      flexBasis: { xs: "100%", sm: "40%" },
      flexGrow: 1,
      ":first-of-type": { flexBasis: "100%" },
    },
  },
  direction: "row",
};
const BranchDetails: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "branch.details" });
  const { id, isActive, clearDetailsParams } = useDetailsSearchParams();
  const { data, isInitialLoading, isSuccess, isError } = branchQueries.useDetailsQuery(id);
  const handleClose = () => {
    clearDetailsParams();
  };
  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogTitle onClose={handleClose} fontSize={30} color="primary">
        {t("title")}
      </DialogTitle>
      <DialogContent>
        {isInitialLoading && (
          <RepeatELement repeat={11} container={<DividedStack {...dividedStackProps} />}>
            <LabelValueSkeleton
              height={20}
              labelWidthRange={{ min: 50, max: 60 }}
              valueWidthRange={{ min: 110, max: 155 }}
            />
          </RepeatELement>
        )}
        {isSuccess && (
          <DividedStack {...dividedStackProps}>
            <LabelValue label={t("name")}>{data.name}</LabelValue>
            <LabelValue label={t("address")}>{data.address}</LabelValue>
            <LabelValue label={t("location")}>
              {data.regionName} - {data.cityName}
            </LabelValue>
            <LabelValue label={t("phoneNumber")}>{data.phoneNumber ?? "-"}</LabelValue>
            <LabelValue label={t("anotherPhoneNumber")}>
              {data.anotherPhoneNumber ?? "-"}
            </LabelValue>
            <LabelValue label={t("landLineNumber")}>{data.landLineNumber ?? "-"}</LabelValue>
            <LabelValue label={t("anotherLandLineNumber")}>
              {data.anotherLandLineNumber ?? "-"}
            </LabelValue>
            <LabelValue label={t("ownerName")}>{data.ownerName}</LabelValue>
            <LabelValue label={t("ownerPhoneNumber")}>{data.ownerPhoneNumber}</LabelValue>
          </DividedStack>
        )}
        {isError && <NoData />}
      </DialogContent>
    </Dialog>
  );
};
export default BranchDetails;
