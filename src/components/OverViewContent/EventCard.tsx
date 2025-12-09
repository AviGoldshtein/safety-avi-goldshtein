import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  Divider,
  useTheme
} from "@mui/material";
import { columns } from "./tableConfig";
import { scrollbarStyle } from "../../styles/scrollbar";

interface EventCardProps {
  open: boolean;
  selectedEvent: any | null;
  onClose: () => void;
  onEdit: (event: any) => void;
  onDelete: (eventId: string) => void;
}

export function EventCard({ open, selectedEvent, onClose, onDelete, onEdit }: EventCardProps) {
  const theme = useTheme();

  function getLabel(key: string) {
    return columns.find(c => c.key === key)?.label ?? key;
  }

  function formatValue(value: any) {
    if (value === null || value === undefined) return "-";

    if (typeof value === "object") {
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    }

    return String(value);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.4rem",
          color: theme.palette.table.text
        }}
      >
        פרטי אירוע
      </DialogTitle>

      <DialogContent
        dividers
        sx={(theme) => ({
            background: theme.palette.background.paper,
            overflow: "auto",
            ...scrollbarStyle,
        })}
      >
        {selectedEvent && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {Object.entries(selectedEvent).map(([key, value]) => (
              <Box key={key}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.table.text
                  }}
                >
                  {getLabel(key)}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.table.text }}
                >
                  {formatValue(value)}
                </Typography>

                <Divider
                  sx={{
                    mt: 1,
                    borderColor: theme.palette.table.divider
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: 2, gap: 1 }}>
        <Button
          color="error"
          variant="contained"
          onClick={() => onDelete(selectedEvent.id)}
          sx={{ fontWeight: "bold" }}
        >
          מחיקה
        </Button>

        <Button
          color="info"
          variant="contained"
          onClick={() => onEdit(selectedEvent)}
          sx={{ fontWeight: "bold" }}
        >
          עריכה
        </Button>
      </DialogActions>
    </Dialog>
  );
}
