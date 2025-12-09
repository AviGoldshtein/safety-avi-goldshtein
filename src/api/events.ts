import type { Payload } from "../components/EventFormWizard/types";


const serverUrl = import.meta.env.VITE_SERVER_URL

export async function fetchEventsApi() {
  const res = await fetch(`${serverUrl}/api/events`);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}

export async function createEvent(payload: Payload) {
  const res = await fetch(`${serverUrl}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

    if (!res.ok) {
        let errorBody: any = null;

        try {
            errorBody = await res.json();
        } catch {
            throw { type: "server", message: "Unknown server error" };
        }

        if (errorBody.name === "ZodError" && typeof errorBody.message === "string") {
            let issues = [];
            try {
                issues = JSON.parse(errorBody.message);
            } catch {
                throw { type: "server", message: errorBody.message };
            }
            throw { type: "validation", issues };
        }

        throw { type: "server", message: errorBody?.error || "Server error" };
    }

  return res.json();
}

export async function updateEventApi(id: string, payload: Partial<Payload>) {
  const res = await fetch(`${serverUrl}/api/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorBody: any = null;

    try {
      errorBody = await res.json();
    } catch {
      throw { type: "server", message: "Unknown server error" };
    }

    if (errorBody.name === "ZodError" && typeof errorBody.message === "string") {
      let issues = [];
      try {
        issues = JSON.parse(errorBody.message);
      } catch {
        throw { type: "server", message: errorBody.message };
      }
      throw { type: "validation", issues };
    }

    throw { type: "server", message: errorBody?.error || "Failed to update event" };
  }

  return res.json();
}

export async function deleteEventApi(id: string) {
  const res = await fetch(`${serverUrl}/api/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    let errorBody: any = null;

    try {
      errorBody = await res.json();
    } catch {
      throw { type: "server", message: "Unknown server error" };
    }

    throw { type: "server", message: errorBody?.error || "Failed to delete event" };
  }

  return { success: true };
}
