import { Box, CircularProgress, Typography } from "@mui/material";
import { useEventImages } from "../../hooks/useEventImages";

const serverUrl = import.meta.env.VITE_SERVER_URL

interface EventImagesProps {
  eventId: string;
}

export function EventImages({ eventId }: EventImagesProps) {
  const { images, loading } = useEventImages(eventId);

  if (loading) {
    return <CircularProgress size={24} />;
  }

  if (!images.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        אין תמונות לאירוע
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 1 }}>
      {images.map(img => (
        <Box
          key={img.id}
          component="img"
          src={`${serverUrl}${img.url}`}
          alt="img"
          sx={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );
}
