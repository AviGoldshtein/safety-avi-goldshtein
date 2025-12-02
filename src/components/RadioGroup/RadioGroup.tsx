import { FormControl, useTheme, Box } from "@mui/material";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  options: readonly string[];
  value: string;
  name: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export default function RadioGroup({ options, value, onChange, name, icon }: RadioGroupProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <FormControl fullWidth>
      <div className={`${styles.mydict} ${isDark ? styles.dark : ""}`}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          {icon && <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>}

          <div>
            {options.map((opt) => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input
                  type="radio"
                  name={name}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(e.target.value)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </Box>
      </div>
    </FormControl>
  );
}
