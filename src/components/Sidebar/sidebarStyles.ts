import type { Theme } from "@mui/material/styles";


export const sidebarBoxStyle = ({ open }: { open: boolean }) => ({
  position: "fixed",
  top: "84px",
  bottom: "80px",
  right: open ? 0 : "-220px",
  width: "220px",
  zIndex: 1200,
  transition: "right 0.3s ease",
});

export const sidebarPaperStyle = (theme: Theme) => ({
  height: "100%",
  width: "100%",
  borderRadius: "20px 0 0 20px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowY: "auto",
  bgcolor: theme.palette.mode === "dark" ? "#1f2533" : "#e7e9ef",
});

export const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};
