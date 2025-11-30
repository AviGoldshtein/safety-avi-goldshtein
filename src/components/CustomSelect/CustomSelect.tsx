import { TextField, MenuItem, useTheme } from "@mui/material";

interface CustomSelectProps {
  options: readonly string[];
  value?: string;
  onChange: (val: string) => void;
}

export default function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const theme = useTheme();

  return (
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
        renderValue: (selected) => !selected ? <em>בחר...</em> : selected as string
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );
}
