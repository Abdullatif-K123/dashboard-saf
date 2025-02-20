import { Gender } from "constants/enums";

export type TourCustomerForm = {
  firstName: string;
  lastName: string;
  nationalNumber: string;
  phoneNumber: string;
  isPaid: boolean;
  chairNumber?: number;
  gender: Gender;
};
