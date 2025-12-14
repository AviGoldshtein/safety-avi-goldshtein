const serverUrl = import.meta.env.VITE_SERVER_URL

export interface UploadedImage {
  file: File;
  preview: string;
}

export async function uploadImagesApi(eventId: string, images: UploadedImage[]) {
  const formData = new FormData();
  images.forEach(img => formData.append("files", img.file));

  await fetch(`${serverUrl}/api/events/${eventId}/images`, {
    method: "POST",
    body: formData
  });
}