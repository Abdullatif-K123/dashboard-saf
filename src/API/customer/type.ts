import { Gender, RecordType } from "constants/enums";
import { PageSize, PaginationParams } from "types/api";

export type CustomerGetAllParams = PaginationParams & {
  recordType: RecordType | null;
  pageSize: PageSize | null;
};

export type Customer = {
  id: string;
  name: string;
  phoneNumber: string;
  toursCount: number;
  isBlocked: boolean;
  gender: Gender;
  recordType: RecordType;
  creationDate: string;
};

export type CustomerDetails = {
  id: string;
  phoneNunber: string;
  fullName: string;
  recordType: RecordType;
  gender: Gender;
};
export type CustomerUpdateRecordTypeBody = {
  recordType: RecordType;
  userId: string;
  cause: string;
};
