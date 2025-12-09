import { createContext, useState, useContext, useEffect } from "react";
import type { FormData } from "../components/EventFormWizard/types";
import { fetchEventsApi, deleteEventApi } from "../api/events";

interface EventsContextType {
  events: FormData[];
  setEvents: React.Dispatch<React.SetStateAction<FormData[]>>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<FormData[]>([]);

  useEffect(() => {
    fetchEventsApi().then(setEvents).catch(console.error);
  }, []);

  async function deleteEvent(id: string) {
    try{
      await deleteEventApi(id);
      setEvents(prev => prev.filter(ev => String(ev.id) !== String(id)));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }

  return (
    <EventsContext.Provider value={{ events, setEvents, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used inside EventsProvider");
  return ctx;
}
