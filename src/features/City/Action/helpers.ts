import { CityActionBody, CityDetails } from "API/city/type";
import { CityActionForm } from "./type";

export function cityFormToBody(data: CityActionForm): CityActionBody {
  return {
    id: data.id,
    name: data.name,
    countryId: data.country?.id ?? "",
    latitude: data.latitude,
    longitude: data.longitude,
  };
}
export function cityDetailsToForm(data: CityDetails): CityActionForm {
  return {
    id: data.id,
    name: data.cityName,
    country: {
      id: data.countryId,
      name: data.countryName,
    },
    latitude: data.latitude,
    longitude: data.longitude,
  };
}
