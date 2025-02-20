import tourQueries from "API/tour/queries";
import { BookedChair } from "API/tour/type";
import { useSocketConnectionContext } from "context/socketHubConnectionContext";
import { useEffect, useState } from "react";

export const useTourChairs = (tourId: string) => {
  const query = tourQueries.useBookedChairs(tourId);
  const [booked, setBooked] = useState<Map<number, BookedChair> | null>(null);
  if (query.data && booked == null) {
    setBooked(new Map(query.data.map((chair) => [chair.chairNumber, chair])));
  }
  const connection = useSocketConnectionContext();
  useEffect(() => {
    if (!connection) return;
    connection.invoke("AddToGroup", tourId);
    connection.on("getCustomersChairs", (booked: BookedChair[]) => {
      setBooked(new Map(booked.map((chair) => [chair.chairNumber, chair])));
    });
    return () => {
      connection.invoke("RemoveFromGroup", tourId);
    };
  }, [connection, tourId]);
  return booked;
};
export default useTourChairs;
