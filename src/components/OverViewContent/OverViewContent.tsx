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

// TODO להוסיף סינון מתאריך עד תאריך

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredColumns = useMemo(
    () => columns.filter(col => !selectedFilters.includes(col.key)),
    [selectedFilters]
  );

    function handleSort(key: string) {
        if (sortKey === key) {
            // הופכים את כיוון המיון
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    }

    const sortedContent = useMemo(() => {
        if (!sortKey) return content;

        return [...content].sort((a, b) => {
            const valueA = a[sortKey] ?? "";
            const valueB = b[sortKey] ?? "";

            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }

            return sortOrder === "asc"
                ? String(valueA).localeCompare(String(valueB))
                : String(valueB).localeCompare(String(valueA));
        });

    }, [content, sortKey, sortOrder]);

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
        content={sortedContent}
        columns={filteredColumns}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    </Box>
  );
}