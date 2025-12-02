import { Box } from "@mui/material";
import { TableContent } from "./TableContent";
import { TableFilters } from "./TableFilters";
import { useState, useMemo, useEffect } from "react";
import type { FormData } from "../EventFormWizard/types";
import { useEvents } from "../../context/EventsContext";

export function OverViewContent() {
  const { events } = useEvents()

  const columns: { key: keyof FormData; label: string }[] = [
    { key: "eventDateTime", label: "תאריך" },
    { key: "eventTime", label: "שעה" },
    { key: "unitActivityType", label: "יחידה" },
    { key: "activityType", label: "פעילות" },
    { key: "category", label: "תחום" },
    { key: "weather", label: "מזג אוויר" },
    { key: "eventSeverity", label: "חומרה" },
    { key: "eventDescription", label: "פירוט" },
    { key: "subUnits", label: "תתי-יחידות" },
    { key: "results", label: "תוצאות" },
    { key: "injuriesLevel", label: "פגיעות" },
    { key: "location", label: "מיקום" },
    { key: "currentLocation", label: "קורדינטות" },
  ];

  const [selectedFilters, setSelectedFilters] = useState<string[]>(["eventDescription", "currentLocation", "subUnits"]);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [sortKey, setSortKey] = useState<keyof FormData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredColumns = useMemo(
    () => columns.filter((col) => !selectedFilters.includes(col.key)),
    [selectedFilters]
  );

  function handleSort(key: keyof FormData) {
    if (sortKey === key) {
      // הופכים את כיוון המיון
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  const dateFilteredContent = useMemo(() => {
    return events.filter((item) => {
      const eventDate = item.eventDateTime
        ? new Date(item.eventDateTime)
        : null;
      if (!eventDate) return false;

      if (fromDate) {
        const from = new Date(fromDate);
        if (eventDate < from) return false;
      }

      if (toDate) {
        const to = new Date(toDate);
        if (eventDate > to) return false;
      }

      return true;
    });
  }, [events, fromDate, toDate]);

  const sortedContent = useMemo(() => {
    if (!sortKey) return dateFilteredContent;

    return [...dateFilteredContent].sort((a, b) => {
      const valueA = a[sortKey] ?? "";
      const valueB = b[sortKey] ?? "";

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [dateFilteredContent, sortKey, sortOrder]);

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <h1>רשימת אירועים</h1>

      <TableFilters
        columns={columns}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        filterAnchor={filterAnchor}
        setFilterAnchor={setFilterAnchor}
        search={search}
        setSearch={setSearch}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
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
