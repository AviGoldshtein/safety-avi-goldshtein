import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"
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
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}