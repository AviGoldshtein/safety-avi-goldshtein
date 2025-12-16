import type { EventImage } from "../types/eventImage";


const serverUrl = import.meta.env.VITE_SERVER_URL

export async function uploadImagesApi(eventId: string, images: EventImage[]) {
  const formData = new FormData();
  images.forEach(img => formData.append("files", img.file!));

  await fetch(`${serverUrl}/api/events/${eventId}/images`, {
    method: "POST",
    body: formData
  });
}

export async function fetchEventImagesApi(eventId: string) {
  const res = await fetch(`${serverUrl}/api/events/${eventId}/images`);
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
}

export async function deleteEventImagesApi(eventId: string, imageIds: string[]) {
  await fetch(`${serverUrl}/api/events/${eventId}/images`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageIds }),
  });
}