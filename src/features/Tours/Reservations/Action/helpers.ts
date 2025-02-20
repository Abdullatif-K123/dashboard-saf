import { TourCustomer, TourCustomerAction } from "API/tour/type";
import { BookingType } from "constants/enums";
import { TourCustomerForm } from "./type";

export function tourCustomerFormToBody(
  form: TourCustomerForm,
  data: TourCustomer | null,
  tourId: string
): TourCustomerAction {
  return {
    bookingType: BookingType.Office,
    ...data,
    gender: form.gender,
    chairNumber: form.chairNumber ?? 1,
    tourId,
    customerFirstName: form.firstName,
    customerLastName: form.lastName,
    customerPhoneNumber: form.phoneNumber,
    isPaid: form.isPaid,
    customerNationalNumber: form.nationalNumber,
  };
}
export function tourCustomerDetailsToForm(data: TourCustomer): TourCustomerForm {
  return {
    gender: data.gender ?? 0,
    chairNumber: data.chairNumber,
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    isPaid: data.isPaid ?? false,
    nationalNumber: data.nationalNumber ?? "",
    phoneNumber: data.phomeNumber ?? "",
  };
}
