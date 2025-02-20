export enum Gender {
  Male,
  Female,
}
export enum RecordType {
  Pending,
  Accepted,
  Rejected,
}
export enum TourStatus {
  Finished,
  Ongoing,
  UpComing,
}
export enum BookingType {
  App,
  Office,
}
export enum PaidType {
  UnPaid,
  Paid,
}
export const Userkind = {
  Admin: "Admin",
  Owner: "Owner",
  Customer: "Customer",
  Cp: "Cp",
  OwnerStaff: "OwnerStaff",
} as const;
export type UserKind = typeof Userkind;

export const AdminType = {
  Cp: "Cp",
  Checker: "Checker",
  Responsible: "Responsible",
} as const;

export type AdminType = typeof AdminType;

export enum PaymentType {
  Office,
  App,
  Mtn,
  Syr,
  Fatora,
}
