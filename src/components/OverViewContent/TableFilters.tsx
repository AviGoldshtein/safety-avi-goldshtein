import { Box, TextField, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material"

interface TableColumn {
  key: string;
  label: string;
}
interface TableFiltersProps {
  columns: TableColumn[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filterAnchor: HTMLElement | null;
  setFilterAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
}

// TODO להוסיף כפתור איפוס פילטרים 

export function TableFilters({
  columns,
  selectedFilters,
  setSelectedFilters,
  filterAnchor,
  setFilterAnchor,
  search,
  setSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate
}: TableFiltersProps) {

  function toggleFilter(key: string) {
    setSelectedFilters(prev =>
      prev.includes(key)
        ? prev.filter(f => f !== key)
        : [...prev, key]
    );
  }

  const openFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(e.currentTarget);
  };

  const closeFilters = () => setFilterAnchor(null);

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

      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={closeFilters}
      >
        {columns.map(col => (
          <MenuItem key={col.key} onClick={() => toggleFilter(col.key)}>
            <Chip
              label={col.label}
              color={selectedFilters.includes(col.key) ? "primary" : "default"}
              size="small"
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}