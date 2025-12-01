import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Column {
  key: string;
  label: string;
}

interface TableContentProps {
  content: any[];
  columns: Column[];
}

export function TableContent({ content, columns }: TableContentProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#2d2d2dff",
        maxHeight: 500,
        borderRadius: "7px",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  backgroundColor: "#2a2a2a",
                  color: "#e0e0e0",
                  fontWeight: 700,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {content.map((row, i) => (
            <TableRow
              key={i}
              hover
              sx={{
                backgroundColor: i % 2 === 0 ? "#3c3c3cff" : "#333333ff",
                "&:hover": { backgroundColor: "#333" },
                "& td": {
                  color: "#d0d0d0",
                  borderBottom: "1px solid #333",
                  padding: "10px 16px",
                },
              }}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {formatCell(objectToString(row[col.key]))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function formatCell(value: any) {
  if (!value) return "-";

  if (value.length > 70) {
    return value.slice(0, 70) + "...";
  }

  return value;
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

