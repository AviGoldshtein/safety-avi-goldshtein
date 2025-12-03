import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, List, ListItemButton, ListItemText, Button } from "@mui/material";
import { Dashboard, EventNote, Search, BarChart } from "@mui/icons-material"

interface SidebarProps {
  open: boolean;
}


export default function Sidebar({ open }: SidebarProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: "84px",
        bottom: "80px",
        right: open ? 0 : "-220px",   // סגירה ופתיחה
        width: "220px",
        zIndex: 1200,
        transition: "right 0.3s ease",
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
          gap: "10px",
          overflowY: "auto",
          bgcolor: theme.palette.mode === "dark" ? "#1f2533" : "#e7e9ef",
        }}
      >
        <List sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <ListItemButton component={Link} to="/over-view" sx={{ borderRadius: 1 }}>
            <Dashboard sx={{ ml: 1 }} />
            <ListItemText primary="מבט על" sx={{ textAlign: "right" }} />
          </ListItemButton>

          <ListItemButton component={Link} to="/" sx={{ borderRadius: 1 }}>
            <EventNote sx={{ ml: 1 }} />
            <ListItemText primary="הזנת אירוע" sx={{ textAlign: "right" }} />
          </ListItemButton>

          <ListItemButton component={Link} to="/development" sx={{ borderRadius: 1 }}>
            <Search sx={{ ml: 1 }} />
            <ListItemText primary="חיפוש אירועים" sx={{ textAlign: "right" }} />
          </ListItemButton>

          <ListItemButton component={Link} to="/development" sx={{ borderRadius: 1 }}>
            <BarChart sx={{ ml: 1 }} />
            <ListItemText primary="דוחות BI" sx={{ textAlign: "right" }} />
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
              transform: "translateY(-2px)",
              boxShadow: "3px 3px 5px black",
            },
          }}
        >
          Example
        </Button>
      </Paper>
    </Box>
  );
}
