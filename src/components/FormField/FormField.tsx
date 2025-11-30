import { FormControl, FormLabel, FormHelperText, useTheme } from "@mui/material";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({ label, error, children }: FormFieldProps) {
  const theme = useTheme();

  return (
    <FormControl
      fullWidth
      error={Boolean(error)}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(0,0,0,0.04)"
            : "rgba(255,255,255,0.05)",
      }}
    >
      <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>

      {children}

      {error && (
        <FormHelperText sx={{ mt: 1 }}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}
