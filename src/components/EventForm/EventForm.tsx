import type { FormEvent } from "react";
import styles from './EventForm.module.css'
import options from '../../data/options'
import CustomSelect from '../CustomSelect/CustomSelect'
import RadioGroup from "../RadioGroup/RadioGroup";
import EventFormSection from "../EventFormSection/EventFormSection";
import { useEventForm } from "../../hooks/useEventForm";
import FormField from "../FormField/FormField";
import { LOCATION_CIVIL, RESULT_HAS_INJURED } from "../../constants/eventConstants";


export default function EventForm() {

    const {
        formData,
        errors,
        updateField,
        takeCurrentLocation,
        handleSubmit,
    } = useEventForm();

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleSubmit((data) => {
            console.log("EVENT:", data);
        });
    }

    return(
        <form onSubmit={onSubmit} className={styles.formContainrWraper}>
            <h1 className={styles.formHeader}>הזנת פרטי האירוע</h1>

            <div className={styles.formContainr}>

                <EventFormSection title={"פרטים"}>
                    <div className={styles.flexRowContainer}>
                        <FormField label="מאפיין פעילות היחידה" error={errors.unitActivityType} >
                            <CustomSelect
                                options={options.unitActivityTypeArr}
                                value={formData.unitActivityType}
                                onChange={(val) => updateField("unitActivityType", val)} />
                        </FormField>

                        <FormField label="מאפיין פעילות הפרט" error={errors.activityType} >
                            <CustomSelect
                                options={options.activityTypeArr}
                                value={formData.activityType}
                                onChange={(val) => updateField("activityType", val)} />
                        </FormField>
                    </div>

                    <FormField label="מאפיין תחומי" error={errors.category} >
                        <CustomSelect
                            options={options.categoryArr}
                            value={formData.category}
                            onChange={(val) => updateField("category", val)} />
                    </FormField>

                    <FormField label="מקום האירוע" error={errors.location} >
                        <RadioGroup
                            options={options.locationArr}
                            value={formData.location}
                            onChange={(val) => updateField("location", val)}
                            name="location" />
                    </FormField>
                </EventFormSection>

                {formData.location?.includes(LOCATION_CIVIL) && (
                    <EventFormSection title={"מיקום מדויק"}>

                        <FormField label="סוג מיקום" error={errors.typeLocation} >
                            <RadioGroup
                                options={options.typeLocationArr}
                                value={formData.typeLocation}
                                onChange={(val) => updateField("typeLocation", val)}
                                name="typeLocation" />
                        </FormField>
                    
                        {formData.typeLocation === "נצ" && (
                            <>
                            <FormField label="אורך:" error={errors.inputLng} >
                                <input 
                                    className={styles.inputLoc} 
                                    id="lon" 
                                    type="number" 
                                    placeholder="הכנס את הספרות של אורך"
                                    value={formData.inputLng}
                                    onChange={(e) => updateField("inputLng", e.target.value)} />
                            </FormField>

                            <FormField label="רוחב:" error={errors.inputLat} >
                                <input 
                                    className={styles.inputLoc} 
                                    id="lat" 
                                    type="number" 
                                    placeholder="הכנס את הספרות של רוחב"
                                    value={formData.inputLat}
                                    onChange={(e) => updateField("inputLat", e.target.value)} />
                            </FormField>
                            </>
                        )}

                        {formData.typeLocation === "לווין" && (
                            <FormField label="מיקום לוויני:" error={errors.currentLocation}>
                                <button type="button" className={styles.locationBtn} onClick={takeCurrentLocation}>
                                    קח מיקום עכשיו
                                </button>

                                {formData.currentLocation && (
                                    <div>
                                        <h2>המיקום שנבחר:</h2>
                                        <p className={styles.latLng}>אורך: {formData.currentLocation.lng}</p>
                                        <p className={styles.latLng}>רוחב: {formData.currentLocation.lat}</p>
                                    </div>
                                )}
                            </FormField>
                        )}

                        {formData.typeLocation === "ידנית" && (
                            <FormField label="כתוב מיקום:" error={errors.stringLoc}>
                                <input 
                                    className={styles.inputLoc} 
                                    type="text" 
                                    placeholder="הוסף כאן בכתב את המיקום"
                                    value={formData.stringLoc}
                                    onChange={(e) => updateField("stringLoc", e.target.value)} />
                            </FormField>
                        )}
                    </EventFormSection>
                )}

                <EventFormSection title={"תיאור האירוע"}>
                    <FormField label="חומרת האירוע" error={errors.eventSeverity}>
                        <RadioGroup
                            options={options.eventSeverityArr}
                            value={formData.eventSeverity}
                            onChange={(val) => updateField("eventSeverity", val)}
                            name="eventSeverity" />
                    </FormField>

                    <FormField label="פירוט נרחב" error={errors.eventDescription}>
                        <textarea
                            className={styles.textarea}
                            placeholder="כתוב כאן פירוט עד 800 מילים"
                            value={formData.eventDescription}
                            onChange={(e) => updateField("eventDescription", e.target.value)}
                        ></textarea>
                    </FormField>

                    <FormField label="יחידות משנה" error={errors.subUnits}>
                        <textarea
                            className={styles.textarea}
                            placeholder="כתוב כאן פירוט עד 800 מילים"
                            value={formData.subUnits}
                            onChange={(e) => updateField("subUnits", e.target.value)}
                        ></textarea>
                    </FormField>
                </EventFormSection>

                <EventFormSection title={"תאריך, שעה ותוצאות האירוע"}>
                    <FormField label="תאריך ושעה" error={errors.eventDateTime}>
                        <input
                            className={styles.timeInput}
                            type="datetime-local"
                            value={formData.eventDateTime}
                            onChange={(e) => updateField("eventDateTime", e.target.value)}
                            max={new Date().toISOString().slice(0, 16)} />
                    </FormField>

                    <FormField label="תוצאות האירוע" error={errors.results}>
                        <CustomSelect
                            options={options.resultsArr}
                            value={formData.results}
                            onChange={(val) => updateField("results", val)} />
                    </FormField>

                    {formData.results?.includes(RESULT_HAS_INJURED) && (
                        <FormField label="חומרת הפגיעה" error={errors.injuriesLevel}>
                            <CustomSelect
                                options={options.injuriesLevelArr}
                                value={formData.injuriesLevel}
                                onChange={(val) => updateField("injuriesLevel", val)} />
                        </FormField>
                    )}
                </EventFormSection>
            </div>

            <button type="submit" className={styles.submitBtn}>
                דווח על האירוע
            </button>
        </form>
    )
}