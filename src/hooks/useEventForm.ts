import { useState, useRef } from "react";

import type { FormData, FormErrors, Payload } from "../components/EventFormWizard/types";
import type { EventImage } from "../types/eventImage";

import { useEvents } from "../context/EventsContext";
import { LOCATION_TYPE_COORDINATE } from "../constants/eventConstants";

import { validateEventForm } from "../utiles/validateEventForm";
import { mapZodIssuesToFormErrors } from "../utiles/zodErrors";

import { createEvent, updateEventApi } from "../api/events";
import { uploadImagesApi, deleteEventImagesApi } from "../api/images";


interface SubmitOptions {
  mode?: "create" | "edit";
  callback: (data: Payload) => void;
}


export function useEventForm(initialData?: Partial<FormData>) {
    const { setEvents } = useEvents()

    const [images, setImages] = useState<EventImage[]>([]);
    const deletedImageIdsRef = useRef<string[]>([]);

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
        eventTime: new Date().toTimeString().slice(0, 5),
        ...initialData,
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
        if (formData.typeLocation === LOCATION_TYPE_COORDINATE && formData.inputLat && formData.inputLng) {
            return {
                ...formData,
                currentLocation: {
                    lat: Number(formData.inputLat),
                    lng: Number(formData.inputLng),
                },
            };
        }

        const { inputLat, inputLng, id, ...rest } = formData;

        return rest;
    }

    async function handleSubmit({ mode = "create", callback }: SubmitOptions) {
        const newErrors = validateEventForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const builtFormData = buildPayload(formData);
        

        try {
            let savedEvent: FormData;
            if (mode === "create") {
                savedEvent = await createEvent(builtFormData);
                setEvents(prev => [...prev, savedEvent]);
            } else {
                // mode === "edit"
                savedEvent = await updateEventApi(initialData?.id!, builtFormData);
                setEvents(prev => prev.map(ev => ev.id === savedEvent.id ? savedEvent : ev));
            }

            // Upload new images
            if (images.length > 0) {
                const newImages = images.filter(img => img.isNew);
                if (newImages.length > 0) await uploadImagesApi(savedEvent.id!, newImages);

            }

            // Delete removed images
            if (deletedImageIdsRef.current.length > 0) {
                await deleteEventImagesApi(savedEvent.id!, deletedImageIdsRef.current);
                deletedImageIdsRef.current = [];
            }

            callback(savedEvent);
            if (mode === "create"){
                resetForm();
                setImages([]);
            }

        } catch (err: any) {
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
        images,
        deletedImageIdsRef,
        setErrors,
        setImages,
        updateField,
        takeCurrentLocation,
        handleSubmit,
        validateEventForm,
        resetForm
    };
}
