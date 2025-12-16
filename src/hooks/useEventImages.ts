import { useEffect, useState } from "react";
import { fetchEventImagesApi } from "../api/images";

export function useEventImages(eventId?: string) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    setLoading(true);
    fetchEventImagesApi(eventId)
      .then(setImages)
      .finally(() => setLoading(false));
  }, [eventId]);

  return { images, loading };
}
