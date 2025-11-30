import { Paper, Typography, Divider, Box, useTheme } from "@mui/material";

interface EventFormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function EventFormSection({ title, children }: EventFormSectionProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: theme.palette.mode === "light" ? "#e2e2e2" : "#0b1220",
        padding: 2,
        margin: "15px 0",
        borderRadius: 3,
        maxWidth: 650,
        minWidth: 350,
        textAlign: "right",
        boxShadow: theme.shadows[3],
      }}
    >
      {title && (
        <Typography
          variant="h5"
          sx={{
            fontSize: "2em",
            marginBottom: 1,
            color: theme.palette.mode === "light" ? "#003366" : "#aad4ff",
          }}
        >
          {title}
        </Typography>
      )}

      <Divider sx={{ mb: 2, backgroundColor: theme.palette.divider }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </Box>
    </Paper>
  );
}
