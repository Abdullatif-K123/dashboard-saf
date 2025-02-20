import { Box, Dialog, Stack, useTheme } from "@mui/material";
import Cancel from "components/buttons/Cancel";
import Submit from "components/buttons/Submit";
import { FC, useState } from "react";
export type Position = {
  x: number;
  y: number;
};
export type MapDialogProps = {
  onPositionSave: (position: Position) => void;
  initialPosition: Position;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MapDialog: FC<MapDialogProps> = ({
  initialPosition,
  onPositionSave,
  open,
  setOpen,
}) => {
  const dir = useTheme().direction;
  const [isHold, setIsHold] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);
  const setNewMapPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), e.currentTarget.offsetWidth);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), e.currentTarget.offsetHeight);
    const posX = x / e.currentTarget.offsetWidth;
    const posY = y / e.currentTarget.offsetHeight;
    setPosition({ x: posX, y: posY });
  };
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setNewMapPosition(e);
  };
  const handleMapMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHold) {
      setNewMapPosition(e);
    }
  };
  const handleSubmit = () => {
    onPositionSave(position);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
      <Stack sx={{ gap: 1, p: 1 }}>
        <Box
          sx={{
            position: "relative",
            border: "5px solid",
            borderColor: "primary.main",
            overflow: "auto",
            height: "80vh",
            p: 1,
          }}
        >
          <Box
            onClick={handleMapClick}
            sx={{
              position: "relative",
              backgroundImage: "url(images/syria.svg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              aspectRatio: "577/527",
              height: 1,
              mx: "auto",
            }}
            onMouseDown={() => setIsHold(true)}
            onMouseUp={() => setIsHold(false)}
            onMouseMove={handleMapMove}
          >
            <Box
              component={"div"}
              sx={{
                cursor: isHold ? "grabbing" : "default",
                position: "absolute",
                border: "7px solid",
                borderColor: "secondary.main",
                bgcolor: "primary.main",
                borderRadius: "50%",
                top: `calc(${position.y * 100}% - 11px)`,
                ...(dir === "ltr"
                  ? {
                      left: `calc(${position.x * 100}% - 11px)`,
                    }
                  : {
                      right: `calc(${position.x * 100}% - 11px)`,
                    }),
                width: 22,
                height: 22,
              }}
            />
          </Box>
        </Box>
        <Stack sx={{ flexDirection: "row", gap: 1, ml: "auto", width: "fit-content" }}>
          <Submit onClick={handleSubmit} size="small" />
          <Cancel onClick={handleClose} size="small" />
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default MapDialog;
