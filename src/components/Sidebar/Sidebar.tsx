import { Box, Paper, List, ListItemButton, ListItemText, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Sidebar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: "84px",
        bottom: "80px",
        right: 0,
        width: "220px",
        zIndex: 1200,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: "20px 0 0 20px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          overflowY: "auto",
          bgcolor: theme.palette.mode === "dark" ? "#1f2533" : "#e7e9ef",
        }}
      >
        <List sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <ListItemButton component={Link} to="/over-view">
            <ListItemText primary="מבט על" />
          </ListItemButton>

          <ListItemButton component={Link} to="/">
            <ListItemText primary="הזנת אירוע" />
          </ListItemButton>

          <ListItemButton component={Link} to="/development">
            <ListItemText primary="חיפוש אירועים" />
          </ListItemButton>

          <ListItemButton component={Link} to="/development">
            <ListItemText primary="דוחות BI" />
          </ListItemButton>
        </List>

        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: "auto",
            borderRadius: "6px",
            boxShadow: "3px 3px 5px black",
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 0.8,
              transform: "translateY(-2px)",
            },
          }}
        >
          Example
        </Button>
      </Paper>
    </Box>
  );
}
