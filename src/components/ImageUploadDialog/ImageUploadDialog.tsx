import { Box, Dialog, IconButton } from "@mui/material";

export interface UploadedImage {
  file: File;
  preview: string;
}

interface ImageUploadDialogProps {
  open: boolean;
  images: UploadedImage[];
  setImages: (imgs: UploadedImage[]) => void;
  onClose: () => void;
}

export default function ImageUploadDialog({
  open,
  images,
  setImages,
  onClose,
}: ImageUploadDialogProps) {
  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 3 }}>
        <h2>צירוף תמונות</h2>

        <Box
          sx={{
            border: "2px dashed #bbb",
            borderRadius: 2,
            p: 4,
            mt: 2,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("image-upload-input")?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFilesSelected(e.dataTransfer.files);
          }}
        >
          גרור תמונות לכאן או לחץ לבחירה
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
        </Box>

        {images.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 100px)",
              gap: 2,
              mt: 3,
            }}
          >
            {images.map((img, idx) => (
              <Box key={idx} sx={{ position: "relative" }}>
                <img
                  src={img.preview}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    bgcolor: "white",
                  }}
                  onClick={() => removeImage(idx)}
                >
                  ❌
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
