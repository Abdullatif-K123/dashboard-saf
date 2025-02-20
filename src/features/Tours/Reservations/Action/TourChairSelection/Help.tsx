import { Box, Divider, Stack, Typography } from "@mui/material";
import BusSeatIcon from "components/icons/BusSeatIcon";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ChairProperties } from "./Chair";
export type HelpProps = {};
export const Help: FC<HelpProps> = ({}) => {
  const { t } = useTranslation("tour");

  return (
    <Stack
      sx={{
        gap: 1,
        width: "max-content",
        "*": { textAlign: "start" },
        ".seat": { flexDirection: "row", height: 20, gap: 1, alignItems: "center" },
        svg: {
          height: "100%",
          width: "max-content",
          filter: "drop-shadow( 1px 1px 2px rgba(0, 0, 0, .7))",
        },
      }}
    >
      {Object.entries(ChairProperties).map(([status, color]) => (
        <Stack className="seat" key={status}>
          <BusSeatIcon color={color.bgcolor} />
          <Typography>{t(`ChairStatus.${status}`)}</Typography>
        </Stack>
      ))}
      <Divider sx={{ borderColor: "#0000001f" }} />
      <Box>{t("bookHelp")}</Box>
    </Stack>
  );
};
export default Help;
