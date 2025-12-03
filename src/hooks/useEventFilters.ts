import { useState } from "react";
import type { FormData } from "../components/EventFormWizard/types";


export function useEventFilters(initialHiddenColumns: string[]) {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState(initialHiddenColumns);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [sortKey, setSortKey] = useState<keyof FormData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function handleSort(key: keyof FormData) {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  function resetFilters() {
    setSearch("");
    setFromDate("");
    setToDate("");
    setHiddenColumns(initialHiddenColumns);
    setSortKey(null);
    setSortOrder("asc");
  }

  return {
    search, fromDate, toDate,
    hiddenColumns, anchor,
    sortKey, sortOrder,

    setSearch, setFromDate, setToDate,
    setHiddenColumns, setAnchor,
    handleSort, resetFilters
  };
}
