import type { Payload } from "../components/EventFormWizard/types";


const serverUrl = import.meta.env.VITE_SERVER_URL

export async function fetchEvents() {
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
