import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Gender } from "constants/enums";
import { FC } from "react";
import { useTranslation } from "react-i18next";
export type GenderRadioProps = { value: any; onChange: (...event: any[]) => void; label: string };
export const GenderRadio: FC<GenderRadioProps> = ({ value, onChange, label }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "enum.Gender" });
  return (
    <>
      <FormControl sx={{ pl: 2 }}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          onChange={onChange}
          value={value}
          row
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <FormControlLabel
            value={Gender.Male}
            sx={{ flex: 1, justifyContent: "center" }}
            control={<Radio />}
            label={t("Male")}
          />
          <FormControlLabel
            value={Gender.Female}
            control={<Radio />}
            label={t("Female")}
            sx={{
              flex: 1,
              justifyContent: "center",
            }}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default GenderRadio;
