import type { FormEvent } from "react";
import styles from './EventForm.module.css'
import options from '../../data/options'
import CustomSelect from '../CustomSelect/CustomSelect'
import RadioGroup from "../RadioGroup/RadioGroup";
import EventFormSection from "../EventFormSection/EventFormSection";
import { useEventForm } from "../../hooks/useEventForm";


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
        // <form onSubmit={handleSubmit} className={styles.formContainrWraper}>
        <form onSubmit={onSubmit} className={styles.formContainrWraper}>
            <h1 className={styles.formHeader}>הזנת פרטי האירוע</h1>

            <div className={styles.formContainr}>

                <EventFormSection title={"פרטים"}>
                    <div className={styles.flexRowContainer}>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">מאפיין פעילות היחידה</label>
                            <CustomSelect
                                options={options.unitActivityTypeArr}
                                value={formData.unitActivityType}
                                onChange={(val) => updateField("unitActivityType", val)}
                            />
                            {errors.unitActivityType && <p className={styles.error}>{errors.unitActivityType}</p>}
                        </div>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">מאפיין פעילות הפרט</label>
                            <CustomSelect
                                options={options.activityTypeArr}
                                value={formData.activityType}
                                onChange={(val) => updateField("activityType", val)}
                            />
                            {errors.activityType && <p className={styles.error}>{errors.activityType}</p>}
                        </div>
                    </div>

                    <div className={styles.flexRowContainer}>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">מאפיין תחומי</label>
                            <CustomSelect
                                options={options.categoryArr}
                                value={formData.category}
                                onChange={(val) => updateField("category", val)}
                            />
                            {errors.category && <p className={styles.error}>{errors.category}</p>}
                        </div>
                    </div>

                    <div className={styles.lableWraper}>
                        <label htmlFor="">מקום האירוע</label>

                        <RadioGroup
                            options={options.locationArr}
                            value={formData.location}
                            onChange={(val) => updateField("location", val)}
                            name="location"
                        />
                        {errors.location && <p className={styles.error}>{errors.location}</p>}
                    </div>
                </EventFormSection>


                {formData.location?.includes("שטח אזרחי") && (
                    <EventFormSection title={"מיקום מדויק"}>

                        <RadioGroup
                            options={["נצ", "לווין", "ידנית"]}
                            value={formData.typeLocation}
                            onChange={(val) => updateField("typeLocation", val)}
                            name="typeLocation"
                            />

                        <div className={styles.lableWraper}>
                        <label>הוסף מיקום</label>
                        {errors.typeLocation && <p className={styles.error}>{errors.typeLocation}</p>}

                        {formData.typeLocation === "נצ" && (
                            <>
                            <label htmlFor="lon">אורך:</label>
                            <input 
                                className={styles.inputLoc} 
                                id="lon" 
                                type="number" 
                                placeholder="הכנס את הספרות של אורך"
                                value={formData.inputLng}
                                onChange={(e) => updateField("inputLng", e.target.value)}
                                />
                                {errors.inputLng && <p className={styles.error}>{errors.inputLng}</p>}

                            <label htmlFor="lat">רוחב:</label>
                            <input 
                                className={styles.inputLoc} 
                                id="lat" 
                                type="number" 
                                placeholder="הכנס את הספרות של רוחב"
                                value={formData.inputLat}
                                onChange={(e) => updateField("inputLat", e.target.value)}
                                />
                                {errors.inputLat && <p className={styles.error}>{errors.inputLat}</p>}
                            </>
                        )}

                        {formData.typeLocation === "לווין" && (
                            <>
                            <button type="button" className={styles.locationBtn} onClick={takeCurrentLocation}>
                                קח מיקום עכשיו
                            </button>

                            {formData.currentLocation && (
                                <div>
                                    <h2>המיקום שנבחר:</h2>
                                    <p className={styles.latLng}>אורך: {formData.currentLocation.lat}</p>
                                    <p className={styles.latLng}>רוחב: {formData.currentLocation.lng}</p>
                                </div>
                            )}
                            {errors.currentLocation && <p className={styles.error}>{errors.currentLocation}</p>}
                            </>
                        )}

                        {formData.typeLocation === "ידנית" && (
                            <>
                            <input 
                                className={styles.inputLoc} 
                                type="text" 
                                placeholder="הוסף כאן בכתב את המיקום"
                                value={formData.stringLoc}
                                onChange={(e) => updateField("stringLoc", e.target.value)}
                                 />
                                {errors.stringLoc && <p className={styles.error}>{errors.stringLoc}</p>}
                            </>
                                
                        )}
                        </div>
                    </EventFormSection>
                )}


                <EventFormSection title={"תיאור האירוע"}>
                    <div className={styles.lableWraper}>
                        <label htmlFor="">חומרת האירוע</label>
                        <RadioGroup
                            options={options.eventSeverityArr}
                            value={formData.eventSeverity}
                            onChange={(val) => updateField("eventSeverity", val)}
                            name="eventSeverity"
                        />
                        {errors.eventSeverity && <p className={styles.error}>{errors.eventSeverity}</p>}
                    </div>
                    <div className={styles.lableWraper}>
                        <label htmlFor="">פירוט נרחב</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="כתוב כאן פירוט עד 800 מילים"
                            value={formData.eventDescription}
                            onChange={(e) => updateField("eventDescription", e.target.value)}
                        ></textarea>
                        {errors.eventDescription && <p className={styles.error}>{errors.eventDescription}</p>}
                    </div>
                    <div className={styles.lableWraper}>
                        <label htmlFor="">יחידות משנה</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="כתוב כאן פירוט עד 800 מילים"
                            value={formData.subUnits}
                            onChange={(e) => updateField("subUnits", e.target.value)}
                        ></textarea>
                        {errors.subUnits && <p className={styles.error}>{errors.subUnits}</p>}
                    </div>
                </EventFormSection>


                <EventFormSection title={"תאריך, שעה ותוצאות האירוע"}>
                    <div className={styles.lableWraper}>
                        <label htmlFor="">תאריך ושעה</label>
                        <input
                            className={styles.timeInput}
                            type="datetime-local"
                            value={formData.eventDateTime}
                            onChange={(e) => updateField("eventDateTime", e.target.value)}
                            max={new Date().toISOString().slice(0, 16)}
                            />
                        {errors.eventDateTime && <p className={styles.error}>{errors.eventDateTime}</p>}
                    </div>

                    <div className={styles.lableWraper}>
                        <label htmlFor="">תוצאות האירוע</label>
                        <CustomSelect
                            options={options.resultsArr}
                            value={formData.results}
                            onChange={(val) => updateField("results", val)}
                            />
                        {errors.results && <p className={styles.error}>{errors.results}</p>}
                    </div>
                </EventFormSection>


                {formData.results?.includes("יש נפגעים") && (
                    <EventFormSection title={"עוצמות הפגיעה"}>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">חומרת הפגיעה </label>
                            <CustomSelect
                                options={options.injuriesLevelArr}
                                value={formData.injuriesLevel}
                                onChange={(val) => updateField("injuriesLevel", val)}
                            />
                            {errors.injuriesLevel && <p className={styles.error}>{errors.injuriesLevel}</p>}
                        </div>
                    </EventFormSection>
                )}
            </div>

            <button type="submit" className={styles.submitBtn}>
                דווח על האירוע
            </button>
        </form>
    )
}