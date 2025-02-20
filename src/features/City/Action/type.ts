export type CityActionForm = {
  id?: string;
  name: string;
  country: {
    id: string;
    name: string;
  } | null;
  latitude: number;
  longitude: number;
};
