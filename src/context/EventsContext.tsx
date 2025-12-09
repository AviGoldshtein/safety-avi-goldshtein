import { createContext, useState, useContext, useEffect } from "react";
import type { FormData } from "../components/EventFormWizard/types";
import { fetchEvents } from "../api/events";

interface EventsContextType {
  events: FormData[];
  setEvents: React.Dispatch<React.SetStateAction<FormData[]>>;
}

const EventsContext = createContext<EventsContextType | null>(null);


export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<FormData[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error)
  }, []);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used inside EventsProvider");
  return ctx;
}
