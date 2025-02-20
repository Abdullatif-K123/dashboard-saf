import homeQueries from "API/home/queries";
import usePrevious from "hooks/usePrevious";
import { useEffect } from "react";
const pingAudio = new Audio("/audio/ping.wav");
export const usePendingCountNotificationSound = () => {
  const { data } = homeQueries.usePendingCount();

  const previousData = usePrevious(data);

  useEffect(() => {
    for (const value in data) {
      if (previousData?.[value] && previousData?.[value] < data?.[value]) {
        ping();
      }
    }
  }, [data, previousData]);
};
function ping() {
  if (pingAudio.paused) {
    pingAudio.play();
    pingAudio.currentTime = 0;
  }
}
