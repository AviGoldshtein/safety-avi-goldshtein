import type { FormData } from "../EventFormWizard/types";

export const columns: { key: keyof FormData; label: string }[] = [
  { key: "id", label: "מזהה" },
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
  { key: "typeLocation", label: "מקור מיקום" },
];

export const initialHiddenColumns: string[] = [
  "id",
  "eventDescription",
  "currentLocation",
  "subUnits",
  "typeLocation",
];
