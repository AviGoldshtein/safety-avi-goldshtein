import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { useEventFilters } from "../../hooks/useEventFilters";
import { useEvents } from "../../context/EventsContext";
import { EventCard } from "./EventCard";

import { TableContent } from "./TableContent";
import { TableFilters } from "./TableFilters";
import { columns, initialHiddenColumns } from './tableConfig';
import { eventsContainerStyles, eventsHeaderStyles } from './OverViewContentStyles';


export function OverViewContent() {

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  function onOpenDetails(event: any) {
    setSelectedEvent(event);
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
    setSelectedEvent(null);
  }


  const { events } = useEvents()
  const filters = useEventFilters(initialHiddenColumns);

  const filteredColumns = useMemo(
    () => columns.filter((col) => !filters.hiddenColumns.includes(col.key)),
    [filters.hiddenColumns]
  );

  const dateFilteredContent = useMemo(() => {
    return events.filter((item) => {
      const eventDate = item.eventDateTime ? new Date(item.eventDateTime) : null;
      if (!eventDate) return false;

      if (filters.fromDate) {
        const from = new Date(filters.fromDate);
        if (eventDate < from) return false;
      }

      if (filters.toDate) {
        const to = new Date(filters.toDate);
        if (eventDate > to) return false;
      }

      return true;
    });
  }, [events, filters.fromDate, filters.toDate]);

  const searchFilteredContent = useMemo(() => {
    if (!filters.search.trim()) return dateFilteredContent;

    const lower = filters.search.toLowerCase();

    return dateFilteredContent.filter(item =>
      filteredColumns.some(col => {
        const value = item[col.key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lower);
      })
    );
  }, [filters.search, dateFilteredContent, filteredColumns]);

  const sortedContent = useMemo(() => {
    if (!filters.sortKey) return searchFilteredContent;

    const key = filters.sortKey;

    return [...searchFilteredContent].sort((a, b) => {
      const valueA = a[key] ?? "";
      const valueB = b[key] ?? "";

      if (typeof valueA === "number" && typeof valueB === "number") {
        return filters.sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return filters.sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [searchFilteredContent, filters.sortKey, filters.sortOrder]);

  return (
    <Box sx={eventsContainerStyles}>
      <Box sx={eventsHeaderStyles}>
        <EventNoteIcon fontSize="large" />
        <Typography variant="h5">רשימת אירועים</Typography>
      </Box>

      <TableFilters columns={columns} {...filters} />

      <TableContent
        content={sortedContent}
        columns={filteredColumns}
        onOpenDetails={onOpenDetails}
        {...filters}
      />

      <EventCard
        open={open}
        onClose={onClose}
        selectedEvent={selectedEvent}
      />
    </Box>
  );
}
