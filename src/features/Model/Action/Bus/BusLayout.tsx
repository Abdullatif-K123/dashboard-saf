import { Box } from "@mui/material";
import hornAudio from "assets/audio/horn.wav";
import BusInteriorIcon from "components/icons/BusInteriorIcon";
import LTR from "components/layout/LTR";
import { FC, ReactNode } from "react";
const horn = new Audio(hornAudio);
export type BusLayoutProps = { children: ReactNode };
export const BusLayout: FC<BusLayoutProps> = ({ children }) => {
  const handleHonk = () => {
    horn.play();
    horn.currentTime = 0;
  };
  return (
    <Box
      sx={{
        mx: "auto",
        mt: 1,
        height: "65vh",
        position: "relative",
        aspectRatio: "134/335",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          svg: { width: "100%", height: "100%" },
        }}
      >
        <BusInteriorIcon />
      </Box>
      <LTR
        sx={{
          position: "absolute",
          zIndex: 3,
          borderRadius: "50%",
          top: "2%",
          cursor: "pointer",
          right: "6%",
          width: "23%",
          aspectRatio: "1",
          svg: { width: "100%", height: "100%" },
        }}
        onClick={handleHonk}
      />
      <LTR sx={{ position: "relative", zIndex: 2, mx: 2, height: "80%", top: "15%" }}>
        {children}
      </LTR>
    </Box>
  );
};
