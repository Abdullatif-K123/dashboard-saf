import { PaginationParams } from "../../types/api";

export type CountryGetAllParams = PaginationParams;

export type Country = {
  id: string;
  cityName: string;
  cityCount: number;
};

export type CountryUpdate = {
  countries: Country[];
};
export type CountrySelect = Pick<Country, "id" | "cityName">;
export type CountryDetails = {
  id: string;
  name: string;
  cityCount: number;
};

export type CountryActionBody = {
  id?: string;
  name: string;
};
