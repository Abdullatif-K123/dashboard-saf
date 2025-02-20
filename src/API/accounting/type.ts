import { PaymentType } from "../../constants/enums";
import { PaginationParams } from "../../types/api";

export type AccountingGet = {
  tourId: string;
  tourName: string;
  branchName: string;
  tourArriveDate: string;
  tourLeaveDate: string;
  companyPrice: number;
  ownerPrice: number;
  isCompanyConfirm: boolean;
  isOwnerConfirm: boolean;
};

export type AccountingParams = PaginationParams;

export type AccountingDetailsParams = PaginationParams & { tourId: string };

export type AccountingBody = {
  branchIds: string[] | null;
  from: string | null;
  to: string | null;
  isCompanyConfirm: boolean | null;
  isOwnerConfirm: boolean | null;
};

export type AccountingDetails = {
  tourName: string;
  customerName: string;
  branchName: string;
  companyPrice: number;
  ownerPrice: number;
  paymentType: PaymentType;
};
