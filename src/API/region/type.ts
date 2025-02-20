import { PaginationParams } from "../../types/api";

export type RegionGetAllParams = PaginationParams & { cityId: string; countryId: string };
export type RegionGetAllNpParams = { cityId: string | null; countryId: string | null };

export type Region = {
  regionName: string;
  cityName: string;
  countryName: string;
  id: string;
};
export type RegionSelect = Pick<Region, "id" | "regionName">;

export type RegionDetails = {
  regionName: string;
  cityName: string;
  countryName: string;
  cityId: string;
  id: string;
};

export type RegionActionBody = {
  id?: string;
  name: string;
  cityId: string;
};
