import { Box } from "@mui/material";
import { TableContent } from "./TableContent";
import { TableFilters } from "./TableFilters";
import { useState, useMemo } from "react";

export function OverViewContent() {

  const content = JSON.parse(localStorage.getItem("eventsList") || "[]");

  const columns = [
    { key: "unitActivityType", label: "יחידה" },
    { key: "activityType", label: "פעילות" },
    { key: "category", label: "תחום" },
    { key: "location", label: "מיקום" },
    { key: "currentLocation", label: "קורדינטות" },
    { key: "weather", label: "מזג אוויר" },
    { key: "eventSeverity", label: "חומרה" },
    { key: "eventDescription", label: "פירוט" },
    { key: "subUnits", label: "תתי-יחידות" },
    { key: "eventDateTime", label: "תאריך" },
    { key: "eventTime", label: "שעה" },
    { key: "results", label: "תוצאות" },
    { key: "injuriesLevel", label: "פגיעות" }
  ];

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");

  const filteredColumns = useMemo(
    () => columns.filter(col => !selectedFilters.includes(col.key)),
    [selectedFilters]
  );

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <h1>רשימת אירועים</h1>

      <TableFilters
        columns={columns}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        filterAnchor={filterAnchor}
        setFilterAnchor={setFilterAnchor}
        search={search}
        setSearch={setSearch}
      />

      <TableContent
        content={content}
        columns={filteredColumns}
      />
    </Box>
  );
}