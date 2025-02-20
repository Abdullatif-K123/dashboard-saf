import themeConstants from "constants/themeConstants";
import { FC } from "react";
import { BusChair, BusChairProps } from "./BusChair";

export type ChairStatus = "Booked" | "Available" | "Selected";
export type ChairProps = {
  chairNumber: number | null | false;
  selected?: boolean;
  onToggleSelect?: () => void;
} & Omit<BusChairProps, "onClick" | "chairProperties">;
export const Chair: FC<ChairProps> = ({ onToggleSelect, selected, ...props }) => {
  const seatState: ChairStatus = getChairState(props.bookId, !!selected);
  const handleClick = () => {

    if (!props.clickable) return;
    if ((seatState === "Available" || seatState === "Selected") && props.chairNumber) {
      onToggleSelect?.();
    }
  };
  return <BusChair chairProperties={ChairProperties[seatState]} onClick={handleClick} {...props} />;
};

export const getChairState = (
  bookId: string | undefined | null,
  selected: boolean
): ChairStatus => {
  if (selected) {
    return "Selected";
  } else if (bookId !== undefined) {
    return "Booked";
  } else {
    return "Available";
  }
};
export type ChairPropertiesParams = { discriminateGender: boolean };
export const ChairProperties = {
  Booked: {
    bgcolor: themeConstants.secondary,
    color: "#fff",
  },
  Available: {
    bgcolor: "#f0f0f0",
    color: themeConstants.primary,
  },
  Selected: {
    bgcolor: themeConstants.primary,
    color: "#fff",
  },
} satisfies {
  [key in ChairStatus]: { bgcolor: string; color: string };
};

export default Chair;
