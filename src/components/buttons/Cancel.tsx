import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
export type CancelProps = ButtonProps;
export const Cancel: FC<CancelProps> = (props) => {
  const { t } = useTranslation();
  //TODO remove duplicates
  return (
    <Button
      {...props}
      sx={{
        color: "primary.main",
        bgcolor: "white",
        border: "1px solid",
        borderColor: "primary.main",
        fontSize: { xs: 15, sm: 20 },
        minWidth: 110,
        "&:hover": {
          bgcolor: "primary.main",
          color: "white",
        },
        ...props.sx,
      }}
    >
      {t("generic.cancel")}
    </Button>
  );
};
export default Cancel;
