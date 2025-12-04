import { Box, TextField, MenuItem } from "@mui/material";
import { textFieldStyle, selectStyle, wrapperStyle, iconBoxStyle } from "./CustomSelectStyles";

interface CustomSelectProps {
  options: readonly string[];
  value?: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export default function CustomSelect({ options, value, onChange, icon }: CustomSelectProps) {

  return (
    <Box sx={wrapperStyle}>
      {icon && <Box sx={iconBoxStyle}>{icon}</Box>}
      <TextField
        select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        fullWidth
        sx={textFieldStyle}
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) => !selected ? <em>בחר...</em> : selected as string,
          MenuProps: {
            PaperProps: {
              sx: selectStyle
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
