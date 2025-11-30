import { FormControl, useTheme } from "@mui/material";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  options: readonly string[];
  value: string;
  name: string;
  onChange: (val: string) => void;
}

export default function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <FormControl fullWidth>
      <div className={`${styles.mydict} ${isDark ? styles.dark : ""}`}>
        <div>
          {options.map((opt) => (
            <label key={opt}>
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
      </div>
    </FormControl>
  );
}
