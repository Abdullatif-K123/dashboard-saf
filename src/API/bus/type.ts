import { PaginationParams } from "../../types/api";

export type BusGetAllParams = PaginationParams;
export type BusGetAllBody = {
  regionId: string | null;
  ownerId: string | null;
  branchId: string | null;
};

export type Bus = {
  id: string;
  name: string;
  number: string;
  chairCount: number;
  cityName: string;
  regionName: string;
  branchName: string;
  ownerName: string;
  ownerPhoneNumber: string;
};
export type BusDetails = {
  id: string;
  name: string;
  number: string;
  chairCount: number;
  busPhotoId: string;
  busPhotoUrl: string;
  platePhotoId: string;
  platePhotoUrl: string;
  branchName: string;
  branchId: string;
  ownerName: string;
  ownerId: string;
  model: {
    id: string;
    name: string;
    module: string;
    chairCount: number;
    columnCount: number;
  };
};
