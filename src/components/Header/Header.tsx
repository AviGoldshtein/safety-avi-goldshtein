import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useThemeMode } from "../../context/ThemeContext";

export default function Header() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
    position="fixed"
    sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
    }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h5" fontWeight="bold">
          מערכת לאיסוף אירועים
        </Typography>

        <IconButton color="inherit" onClick={toggleMode}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}