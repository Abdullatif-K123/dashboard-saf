import { PaginationParams } from "../../types/api";

export type CountryGetAllParams = PaginationParams;

export type Country = {
  id: string;
  name: string;
  cityCount: number;
};

export type CountryUpdate = {
  countries: Country[];
};
export type CountrySelect = Pick<CountryUpdate, "id" | "name">;
export type CountryDetails = {
  id: string;
  name: string;
  cityCount: number;
};

export type CountryActionBody = {
  id?: string;
  name: string;
};
