import { useState } from "react";
import { validateEventForm } from "../utiles/validateEventForm";
import { useEvents } from "../context/EventsContext";
import type { FormData, FormErrors, Payload } from "../components/EventFormWizard/types";
import { LOCATION_TYPE_COORDINATE } from "../constants/eventConstants";
import { createEvent } from "../api/events";
import { mapZodIssuesToFormErrors } from "../utiles/zodErrors";


export function useEventForm() {
    const { setEvents } = useEvents()

    const initialState: FormData = {
        unitActivityType: "",
        activityType: "",
        category: "",
        location: "",

        typeLocation: null,
        inputLat: "",
        inputLng: "",
        currentLocation: null,
        weather: "",

        eventDescription: "",
        subUnits: "",
        eventSeverity: "",
        results: "",
        injuriesLevel: null,
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

    function buildPayload(formData: FormData): Payload {
        if (formData.typeLocation === LOCATION_TYPE_COORDINATE){
            return {
                ...formData,
                currentLocation: {
                    lat: Number(formData.inputLat),
                    lng: Number(formData.inputLng),
                },
            };
        }

        const { inputLat, inputLng, ...rest } = formData;

        return rest;
    }

    async function handleSubmit(callback: (data: Payload) => void) {
        const newErrors = validateEventForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const builtFormData = buildPayload(formData);

        try {
            const savedEvent = await createEvent(builtFormData);

            callback(savedEvent);
            setEvents(prev => [...prev, savedEvent]);
            resetForm();
        } 
        
        catch (err: any) {
            console.error("Error saving event:", err);

            if (err.type === "validation") {
                const formErrors = mapZodIssuesToFormErrors(err.issues);
                setErrors(formErrors);
                return;
            }

            alert(err.message || "Something went wrong on the server");
        }
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
