import { useState } from "react";
import { validateEventForm } from "../utiles/validateEventForm";
import type { FormData, FormErrors } from "../components/EventForm/types";

export function useEventForm() {

    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        unitActivityType: "",
        activityType: "",
        category: "",
        location: "",

        typeLocation: "",
        inputLat: "",
        inputLng: "",
        stringLoc: "",
        currentLocation: null,

        eventDescription: "",
        subUnits: "",
        eventSeverity: "",
        results: "",
        injuriesLevel: "",
        eventDateTime: "",
    });

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
        setFormData({
            unitActivityType: "",
            activityType: "",
            category: "",
            location: "",

            typeLocation: "",
            inputLat: "",
            inputLng: "",
            stringLoc: "",
            currentLocation: null,

            eventDescription: "",
            subUnits: "",
            eventSeverity: "",
            results: "",
            injuriesLevel: "",
            eventDateTime: "",
        });
    }

    function handleSubmit(callback: (data: FormData) => void) {
        const newErrors = validateEventForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        callback(formData);

        saveEventToLocalStorage(formData);
        
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
        updateField,
        takeCurrentLocation,
        handleSubmit,
    };
}
