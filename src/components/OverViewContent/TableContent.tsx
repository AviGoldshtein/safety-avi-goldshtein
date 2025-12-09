import { useTheme } from "@mui/material/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from "@mui/material";
import { UnfoldMore, ArrowUpward, ArrowDownward, StackedBarChart } from "@mui/icons-material";

import type { FormData } from "../EventFormWizard/types";
import { tableContainerStyles, tableHeaderCellStyles, tableRowStyles, tableCellStyles, emptyStateStyles, tableHeaderContentStyles } from './OverViewContentStyles'


interface Column {
  key: keyof FormData;
  label: string;
}

interface TableContentProps {
  content: any[];
  columns: Column[];
  handleSort: (key: keyof FormData) => void;
  sortKey: string | null;
  sortOrder: "asc" | "desc";
  onOpenDetails: (row: any) => void;
}

export function TableContent({ content, columns, handleSort, sortKey, sortOrder, onOpenDetails }: TableContentProps) {
    const theme = useTheme();

    function isIsoDate(value: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }

    function convertIsoToDisplay(dateStr: string) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    function objectToString(obj: any): string {
        if (obj === null || obj === undefined) return "";
        
        if (typeof obj !== "object") return String(obj);

        if (Array.isArray(obj)) {
            return obj.map(objectToString).join(", ");
        }

        return Object.entries(obj)
            .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
                return `${key}: { ${objectToString(value)} }`;
            } else {
                return `${key}: ${value}`;
            }
            })
            .join("\n");
    }

    function formatCell(value: any): string {
        if (!value) return "-";

        if (typeof value === "string" && isIsoDate(value)) {
            return convertIsoToDisplay(value);
        }

        if (typeof value === "object") {
            value = objectToString(value);
        }

        if (typeof value === "string" && value.length > 70) {
            return value.slice(0, 70) + "...";
        }

        return String(value);
    }

  return (
    <TableContainer
      component={Paper}
      sx={tableContainerStyles(theme)}
    >
      {content.length ? (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  sx={tableHeaderCellStyles(theme)}
                >
                  <Box sx={tableHeaderContentStyles}>
                    {col.label}
                    {sortKey === col.key ? (
                      sortOrder === "asc"
                        ? <ArrowUpward fontSize="small" />
                        : <ArrowDownward fontSize="small" />
                    ) : (
                      <UnfoldMore fontSize="small" sx={{ opacity: 0.5 }} />
                    )}
                  </Box>
                </TableCell>
              ))}
              <TableCell sx={tableHeaderCellStyles(theme)}>פעולות</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {content.map((row, i) => (
              <TableRow key={i} sx={tableRowStyles(theme, i)}>
                {columns.map((col) => (
                  <TableCell key={col.key} sx={tableCellStyles}>
                    {formatCell(row[col.key])}
                  </TableCell>
                ))}

                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onOpenDetails(row)}
                  >
                    לפרטים
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box
          sx={emptyStateStyles}
        >
          לא נמצאו נתונים להצגה
          <StackedBarChart />
        </Box>
      )}
    </TableContainer>
  );
}
