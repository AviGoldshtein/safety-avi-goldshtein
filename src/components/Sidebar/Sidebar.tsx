import { Link } from "react-router-dom";
import { Box, Paper, List, ListItemButton, ListItemText } from "@mui/material";
import { Dashboard, EventNote, Search, BarChart } from "@mui/icons-material";

import { sidebarBoxStyle, sidebarPaperStyle, listStyle } from "./sidebarStyles";

interface SidebarProps {
  open: boolean;
}

const sidebarItems = [
  { label: "מבט על", icon: <Dashboard sx={{ ml: 1 }} />, path: "/over-view" },
  { label: "הזנת אירוע", icon: <EventNote sx={{ ml: 1 }} />, path: "/" },
  { label: "חיפוש אירועים", icon: <Search sx={{ ml: 1 }} />, path: "/development" },
  { label: "דוחות BI", icon: <BarChart sx={{ ml: 1 }} />, path: "/development" },
];


export default function Sidebar({ open }: SidebarProps) {
  return (
    <Box sx={sidebarBoxStyle({ open })} >
      <Paper elevation={3} sx={sidebarPaperStyle} >
        <List sx={listStyle}>
          {sidebarItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              sx={{ borderRadius: 1 }}
            >
              {item.icon}
              <ListItemText primary={item.label} sx={{ textAlign: "right" }} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
