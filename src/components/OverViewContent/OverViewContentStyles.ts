import type { Theme } from "@mui/material";
import { scrollbarStyle } from "../../styles/scrollbar";

export const eventsContainerStyles = {
  display: "flex",
  flexDirection: "column",
  p: 2,
  bgcolor: "background.paper",
  borderRadius: 2,
  height: "calc(100vh - 130px)",
  overflow: "auto",
  ...scrollbarStyle,
  minWidth: "70vw"
};

export const eventsHeaderStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  mb: 2,
};

export const tableContainerStyles = (theme: Theme) => ({
  flex: 1,
  minHeight: 300,
  backgroundColor: theme.palette.table.rowEven,
  borderRadius: "7px",
  border: `2px solid ${theme.palette.table.border}`,
  ...scrollbarStyle,
});

export const tableHeaderCellStyles = (theme: Theme) => ({
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: theme.palette.table.header,
  color: theme.palette.table.text,
  fontWeight: 700,
  borderBottom: `1px solid ${theme.palette.table.divider}`,
});

export const tableHeaderContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: 0.5,
};

export const tableRowStyles = (theme: Theme, index: number) => ({
  backgroundColor:
    index % 2 === 0 ? theme.palette.table.rowEven : theme.palette.table.rowOdd,
  "&:hover": {
    backgroundColor: theme.palette.table.hover,
  },
  "& td": {
    color: theme.palette.table.text,
    borderBottom: `1px solid ${theme.palette.table.divider}`,
    padding: "10px 16px",
  },
});

export const tableCellStyles = {
  maxWidth: 120,
  overflow: "hidden",
  textAlign: "right",
};

export const emptyStateStyles = (theme: Theme) => ({
  height: "100%",
  minHeight: 300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: 1.5,
  color: theme.palette.table.text,
});
