import { Gender, TourStatus } from "constants/enums";
import { PaginationParams } from "../../types/api";

export type TourGetAllParams = PaginationParams;
export type TourGetAllBody = {
  ownerId: string | null;
  branchId: string | null;
  tourStatus: TourStatus | null;
};

export type Tour = {
  id: string;
  name: string;
  branchName: string;
  ownerName: string;
  customersCount: number;
  tourStatus: number;
  chairPrice: number;
};
export type TourDetails = {
  id: string;
  name: string;
  chairPrice: number;
  leaveDate: Date;
  arriveDate: Date;
  tourStatus: number;
  branchId: string;
  branchName: string;
  busId: string;
  busName: string;
  driverName: string;
  driverphoneNumber: string;
  anotherDriverphoneNumber: string;
  coDriverName: string;
  coDriverPhoneNumber: string;
  anotherCoDriverPhoneNumber: string;
  tourCities: TourCity[];
};

export interface TourCity {
  id: string;
  cityId: string;
  cityName: string;
  time: string;
  breakTime: number;
}
export type TourGetCustomersParams = PaginationParams & { tourId: string };
export type TourCustomer = {
  id: string;
  tourCustomerChairId: string;
  tourCustomerId: string;
  tourName: string;
  code: string;
  tourId: string;
  chairNumber: number;
  firstName: string;
  lastName: string;
  phomeNumber: string;
  nationalNumber: string;
  bookingType: number;
  gender: number;
  isPaid: boolean;
  customerName: string;
  customerPhoneNumber: string;
};
export type TourCustomerAction = {
  tourCustomerChairId?: string;
  tourId: string;
  tourCustomerId?: string;
  customerFirstName: string;
  customerLastName: string;
  customerNationalNumber: string;
  customerPhoneNumber: string;
  isPaid: boolean;
  bookingType: number;
  gender: number;
  chairNumber: number;
};

export type TourBookBody = string[];
export type BookedChair = { chairNumber: number; customerId: string; gender: Gender };

export type TourDetailsForCustomerParams = {
  tourId: string;
};

export type TourDetailsForCustomer = {
  id: string;
  rate: number;
  tourStatus: TourStatus;
  name: string;
  branchName: string;
  chairPrice: number;
  leaveDate: string;
  arriveDate: string;
  chairsCount: number;
  chairsBlockedCount: number;
  chairsFreeCount: number;
  tourCities: TourDetailsCity[];
  busImageUrl: string;
  customerHasChairs: boolean;
  model: BusModel;
  genderDiscrimination: boolean;
};

export type BusModel = {
  id: string;
  name: string;
  module: (number | null)[];
  chairCount: number;
  columnCount: number;
};

export type TourDetailsCity = {
  id: string;
  cityId: string;
  cityName: string;
  time: string;
  breakTime: number;
};
