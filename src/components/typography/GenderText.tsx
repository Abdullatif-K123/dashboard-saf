import { Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Gender } from "../../constants/enums";
type Props = {
  gender: Gender;
};
const GenderText: FC<Props> = ({ gender }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "enum.Gender" });
  return (
    <>
      {gender === Gender.Male && <Typography sx={{ color: "#029EF6" }}>{t("Male")}</Typography>}
      {gender === Gender.Female && <Typography sx={{ color: "#E547A1" }}>{t("Female")}</Typography>}
    </>
  );
};
export default GenderText;
