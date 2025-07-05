import { PaginationParams } from "../../types/api";

export type CityGetAllParams = PaginationParams & {
  countryId: string;
};

export type City = {
  id: string;
  name: string;
  countryName: string;
  regionCount: number;
  latitude: number;
  longitude: number;
};
export type CitySelect = Pick<City, "id" | "name">;
export type CityDetails = {
  id: string;
  countryId: string;
  name: string;
  countryName: string;
  latitude: number;
  longitude: number;
};

export type CityActionBody = {
  id?: string;
  name: string;
  countryId: string;
  latitude: number;
  longitude: number;
};
