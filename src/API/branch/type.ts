import { PaginationParams } from "../../types/api";

export type BranchGetAllParams = PaginationParams;
export type BranchGetAllBody = {
  regionId: string | null;
  ownerId: string | null;
  recordType: RecordType | null;
};
export type Branch = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  landLineNumber: string;
  recordType: RecordType;
  region: string;
  city: string;
  owner: string;
  ownerPhoneNumber: string;
  toursCount: number;
  creationDate: string;
};
export type BranchDetails = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string | null;
  anotherPhoneNumber: string | null;
  landLineNumber: string | null;
  anotherLandLineNumber: string | null;
  regionName: string;
  regionId: string;
  cityName: string;
  cityId: string;
  ownerId: string;
  ownerName: string;
  ownerPhoneNumber: string;
};

export type BranchChangeRecordParams = {
  branchId: string;
  recordType: RecordType;
  rejectingReason: string;
};

export type BranchSelectParams = {
  ownerId: string | null;
};

export type BranchSelect = {
  id: string;
  name: string;
};
export enum RecordType {
  Pending,
  Accepted,
  Rejected,
}
