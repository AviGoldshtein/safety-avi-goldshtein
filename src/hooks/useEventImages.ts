import { useEffect, useState } from "react";
import { fetchEventImagesApi } from "../api/images";


export function useEventImages(eventId?: string) {
  const [eventImages, setImages] = useState<any[]>([]);
  const [eventLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    setLoading(true);
    fetchEventImagesApi(eventId)
      .then(setImages)
      .finally(() => setLoading(false));
  }, [eventId]);

  return { eventImages, eventLoading };
}
