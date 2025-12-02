import { useState } from "react";
import { validateEventForm } from "../utiles/validateEventForm";
import { useEvents } from "../context/EventsContext";
import type { FormData, FormErrors } from "../components/EventFormWizard/types";

export function useEventForm() {
    const { setEvents } = useEvents()

    const initialState: FormData = {
        unitActivityType: "",
        activityType: "",
        category: "",
        location: "",

        typeLocation: "",
        inputLat: "",
        inputLng: "",
        stringLoc: "",
        currentLocation: null,
        weather: "",

        eventDescription: "",
        subUnits: "",
        eventSeverity: "",
        results: "",
        injuriesLevel: "",
        eventDateTime: "",
        eventTime: new Date().toTimeString().slice(0, 5)
    }

    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>(initialState);

    function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
        setFormData(prev => ({ ...prev, [key]: value }));
    }

    function takeCurrentLocation() {
        if (!navigator.geolocation) {
            alert("הדפדפן לא תומך במיקום");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                setFormData(prev => ({
                    ...prev,
                    currentLocation: {
                        lat: latitude,
                        lng: longitude,
                    },
                }));
            },
            () => alert("לא ניתן לקבל מיקום")
        );
    }

    function resetForm(){
        setFormData(initialState);
        setErrors({});
    }

    function buildPayload(formData: FormData) {
        if (formData.typeLocation === "נצ"){
            return {
                ...formData,
                currentLocation: {
                lat: Number(formData.inputLat),
                lng: Number(formData.inputLng),
                },
                inputLat: "",
                inputLng: "",
                stringLoc: "",
            };
        }

        return formData;
    }

    function handleSubmit(callback: (data: FormData) => void) {
        const newErrors = validateEventForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        callback(formData);

        saveEventToLocalStorage(buildPayload(formData));

        setEvents(prev => [...prev, formData]);
        
        resetForm();
    }

    function saveEventToLocalStorage(event: FormData) {
        const existing = localStorage.getItem("eventsList");
        const events = existing ? JSON.parse(existing) : [];

        events.push(event);

        localStorage.setItem("eventsList", JSON.stringify(events));
    }

    return {
        formData,
        errors,
        setErrors,
        updateField,
        takeCurrentLocation,
        handleSubmit,
        validateEventForm,
        resetForm
    };
}
