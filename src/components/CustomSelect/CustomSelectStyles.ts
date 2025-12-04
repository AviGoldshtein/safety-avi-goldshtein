import type { Theme } from "@mui/material";
import { scrollbarStyle } from "../../styles/scrollbar";

export const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const iconBoxStyle = {
  display: "flex",
  alignItems: "center",
};

export const textFieldStyle = (theme: Theme) => ({
  bgcolor: theme.palette.mode === "dark" ? "#1f2533" : "#e7e9ef",
  borderRadius: 2,
});

export const selectStyle = {
  maxHeight: 400,
  overflow: "auto",
  ...scrollbarStyle,
};
