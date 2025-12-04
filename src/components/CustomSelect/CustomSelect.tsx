import { Box, TextField, MenuItem, useTheme } from "@mui/material";
import { scrollbarStyle } from "../../styles/scrollbar";

interface CustomSelectProps {
  options: readonly string[];
  value?: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export default function CustomSelect({ options, value, onChange, icon }: CustomSelectProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon && <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>}
      <TextField
        select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        fullWidth
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#1f2533" : "#e7e9ef",
          borderRadius: 2,
        }}
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) => !selected ? <em>בחר...</em> : selected as string,
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 400,
                overflow: "auto",
                ...scrollbarStyle,
              }
            }
          }
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
