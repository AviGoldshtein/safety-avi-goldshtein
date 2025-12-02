import { useTheme } from "@mui/material/styles";
import { UnfoldMore, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";

interface Column {
  key: string;
  label: string;
}

interface TableContentProps {
  content: any[];
  columns: Column[];
  onSort: (key: string) => void;
  sortKey: string | null;
  sortOrder: "asc" | "desc";
}

export function TableContent({ content, columns, onSort, sortKey, sortOrder }: TableContentProps) {
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
      sx={{
        backgroundColor: theme.palette.table.rowEven,
        maxHeight: 500,
        borderRadius: "7px",
        border: `2px solid ${theme.palette.table.border}`,

        "&::-webkit-scrollbar": {
            width: "15px",
        },
        "&::-webkit-scrollbar-track": {
            background: theme.palette.table.rowOdd,
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.table.header,
            borderRadius: "10px",
            border: `2px solid ${theme.palette.table.rowOdd}`,
            },
        "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.table.hover,
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                onClick={() => onSort(col.key)}
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  backgroundColor: theme.palette.table.header,
                  color: theme.palette.table.text,
                  fontWeight: 700,
                  borderBottom: `1px solid ${theme.palette.table.divider}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: 0.5 }}>
                  {col.label}
                  {sortKey === col.key ? (
                    sortOrder === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )
                  ) : (
                    <UnfoldMore fontSize="small" sx={{ opacity: 0.5 }} />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {content.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                backgroundColor:
                  i % 2 === 0
                    ? theme.palette.table.rowEven
                    : theme.palette.table.rowOdd,
                "&:hover": {
                  backgroundColor: theme.palette.table.hover,
                },
                "& td": {
                  color: theme.palette.table.text,
                  borderBottom: `1px solid ${theme.palette.table.divider}`,
                  padding: "10px 16px",
                },
              }}
            >
              {columns.map((col) => (
                <TableCell key={col.key} sx={{maxWidth: 120, overflow: "hidden", textAlign: "right"}}>
                  {formatCell(row[col.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
