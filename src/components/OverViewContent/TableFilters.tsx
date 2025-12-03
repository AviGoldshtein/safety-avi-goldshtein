import { Box, TextField, Chip, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { Search, FilterList, RestartAlt } from "@mui/icons-material"

interface TableColumn {
  key: string;
  label: string;
}
interface TableFiltersProps {
  columns: TableColumn[];
  hiddenColumns: string[];
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>;
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}


export function TableFilters({
  columns,
  hiddenColumns,
  setHiddenColumns,
  anchor,
  setAnchor,
  search,
  setSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  resetFilters
}: TableFiltersProps) {

  function toggleColumnsVisibility(key: string) {
    setHiddenColumns(prev =>
      prev.includes(key)
        ? prev.filter(f => f !== key)
        : [...prev, key]
    );
  }

  const openFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const closeFilters = () => setAnchor(null);

  return (
    <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
      <TextField
        placeholder="חיפוש..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ opacity: 0.6, mr: 1 }} />,
        }}
      />

      <TextField
        label="מתאריך"
        type="date"
        size="small"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      
      <TextField
        label="עד תאריך"
        type="date"
        size="small"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <IconButton onClick={openFilters}>
        <FilterList />
      </IconButton>

      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<RestartAlt sx={{ml: 2}} />}
        onClick={resetFilters}
      >
        איפוס פילטרים
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={closeFilters}
      >
        {columns.map(col => (
          <MenuItem key={col.key} onClick={() => toggleColumnsVisibility(col.key)}>
            <Chip
              label={col.label}
              color={hiddenColumns.includes(col.key) ? "default" : "primary"}
              size="small"
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}