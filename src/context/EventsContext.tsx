import { createContext, useState, useContext, useEffect } from "react";
import type { FormData, Payload } from "../components/EventFormWizard/types";
import { fetchEventsApi, deleteEventApi, updateEventApi } from "../api/events";

interface EventsContextType {
  events: FormData[];
  setEvents: React.Dispatch<React.SetStateAction<FormData[]>>;
  deleteEvent: (id: string) => Promise<void>;
  updateEvent: (id: string, payload: Partial<FormData>) => Promise<void>;
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

  async function updateEvent(id: string, payload: Partial<Payload>) {
    try {
      const saved = await updateEventApi(id, payload);
      setEvents(prev => prev.map(ev => (String(ev.id) === String(id) ? saved : ev)));
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  }

  return (
    <EventsContext.Provider value={{ events, setEvents, deleteEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used inside EventsProvider");
  return ctx;
}
