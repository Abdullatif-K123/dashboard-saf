import { Gender, RecordType } from "constants/enums";
import { PaginationParams } from "../../types/api";

export type OwnerGetAllParams = PaginationParams & { recordType: RecordType | null };

export type Owner = {
  id: string;
  name: string;
  phoneNumber: string;
  branchesNumber: number;
  isBlocked: boolean;
  recordType: RecordType;
  gender: Gender;
  creationDate: string;
};
export type OwnerSelect = {
  id: string;
  name: string;
};
export type OwnerDetails = {
  id: string;
  gender: Gender;
  phoneNunber: string;
  fullName: string;
  recordType: RecordType;
};

export type OwnerUpdateRecordTypeBody = {
  recordType: RecordType;
  userId: string;
  cause: string;
};
