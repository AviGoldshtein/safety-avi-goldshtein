import styles from './Header.module.css';
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../context/ThemeContext";

export default function Header() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <div className={styles.headerContainer}>
      <h1>מערכת לאיסוף אירועים</h1>

      <IconButton onClick={toggleMode} color="inherit">
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </div>
  );
}