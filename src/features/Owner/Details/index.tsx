import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DividedStack, { DividedStackProps } from "components/layout/DividedStack";
import LabelValue from "components/typography/LabelValue";

import ownerQueries from "API/owner/queries";
import LabelValueSkeleton from "components/feedback/LabelValueSkeleton";
import NoData from "components/feedback/NoData";
import DialogTitle from "components/forms/DialogTitle";
import RepeatELement from "components/layout/RepeatElement";
import GenderText from "components/typography/GenderText";
import RecordTypeColored from "components/typography/RecordTypeColored";
import useDetailsSearchParams from "hooks/useDetailsSearchParams";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const dividedStackProps: DividedStackProps = {
  gap: 3,
  sx: {
    "& > * ": {
      flexBasis: { xs: "100%" },
      flexGrow: 1,
    },
    "& *": {
      justifyContent: "space-between",
    },
  },
};
const OwnerDetails: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "owner.details" });
  const { id, isActive, clearDetailsParams } = useDetailsSearchParams();
  const { data, isInitialLoading, isSuccess, isError } = ownerQueries.useDetailsQuery(id);
  const handleClose = () => {
    clearDetailsParams();
  };
  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogTitle onClose={handleClose} fontSize={30} color="primary">
        {t("title")}
      </DialogTitle>
      <DialogContent>
        {isInitialLoading && (
          <RepeatELement repeat={4} container={<DividedStack {...dividedStackProps} />}>
            <LabelValueSkeleton
              height={25}
              labelWidthRange={{ min: 50, max: 60 }}
              valueWidthRange={{ min: 80, max: 100 }}
            />
          </RepeatELement>
        )}
        {isSuccess && (
          <DividedStack {...dividedStackProps}>
            <LabelValue label={t("fullName")} sx={{ flexBasis: { xs: "100%" } }}>
              {data.fullName}
            </LabelValue>
            <LabelValue label={t("phoneNunber")} ltr>
              {data.phoneNunber}
            </LabelValue>
            <LabelValue label={t("gender")}>
              <GenderText gender={data?.gender ?? 0} />
            </LabelValue>
            <LabelValue label={t("recordType")} ltr>
              <RecordTypeColored recordType={data.recordType} />
            </LabelValue>
          </DividedStack>
        )}
        {isError && <NoData />}
      </DialogContent>
    </Dialog>
  );
};
export default OwnerDetails;
