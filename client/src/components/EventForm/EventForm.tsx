import { useState } from "react";
import type { FormEvent } from "react";
import styles from './EventForm.module.css'
import CustomSelect from '../CustomSelect/CustomSelect'
import options from '../../data/options'
import RadioGroup from "../RadioGroup/RadioGroup";

import EventFormSection from "../EventFormSection/EventFormSection";
import type { EventType, FormErrors, Location } from './types'


export default function EventForm() {
    const [unitActivityType, setUnitActivityType] = useState("")
    const [activityType, setActivityType] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")

    const [typeLocation, setTypeLocation] = useState("")
    const [inputLng, setInputLng] = useState("")
    const [inputLat, setInputLat] = useState("")
    const [stringLoc, setStringLoc] = useState("")

    const [eventDescription, setEventDescription] = useState("");
    const [subUnits, setSubUnits] = useState("");

    const [eventSeverity, setEventSeverity] = useState("")
    const [results, setResults] = useState("")
    const [injuriesLevel, setInjuriesLevel] = useState("")
    const [eventDateTime, setEventDateTime] = useState("");
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    const [errors, setErrors] = useState<FormErrors>({});

    function takeCurrentLocation() {
        if (!navigator.geolocation) {
            alert("הדפדפן לא תומך במיקום");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (err) => {
                console.error(err);
                alert("לא ניתן לקבל מיקום");
            }
        );
    }


    function validateForm() {
        const newErrors: { [key: string]: string } = {};

        // פעילות יחידה
        if (!unitActivityType.trim()) {
            newErrors.unitActivityType = "יש לבחור מאפיין פעילות יחידה";
        }

        // פעילות פרט
        if (!activityType.trim()) {
            newErrors.activityType = "יש לבחור מאפיין פעילות הפרט";
        }

        // מאפיין תחומי
        if (!category.trim()) {
            newErrors.category = "יש לבחור מאפיין תחומי";
        }

        if (location === "שטח אזרחי"){
            // סוג מיקום (טקסט / לווין)
            if (!typeLocation.trim()) {
                newErrors.typeLocation = "יש לבחור סוג מיקום";
            }
    
            // *** if typeLocation === "לווין" → חייב קואורדינטות ***
            if (typeLocation === "נצ") {
                if (!inputLat.trim()) {
                    newErrors.inputLat = "יש להזין קו רוחב";
                } else {
                    const lat = Number(inputLat);
                    if (isNaN(lat) || lat < -90 || lat > 90) {
                        newErrors.inputLat = "קו רוחב לא תקין";
                    }
                } 
    
                if (!inputLng.trim()) {
                    newErrors.inputLng = "יש להזין קו אורך";
                } else {
                    const lng = Number(inputLng)
                    if (isNaN(lng) || lng < -180 || lng > 180) {
                        newErrors.inputLng = "קו אורך לא תקין";
                    }
                }
            }
    
            // *** אם typeLocation === "טקסט" → חייב stringLoc ***
            if (typeLocation === "ידנית") {
                if (!stringLoc.trim()) {
                    newErrors.stringLoc = "יש להזין מיקום טקסטואלי";
                }
            }

            if (typeLocation === "לווין"){
                if (!currentLocation){
                    newErrors.currentLocation = "לא נבחרה מיקום"
                }
            }
        }


        // מיקום מתוך radio group
        if (!location.trim()) {
            newErrors.location = "יש לבחור מקום אירוע";
        }

        // תיאור האירוע
        if (!eventDescription.trim()) {
            newErrors.eventDescription = "יש להזין תיאור האירוע";
        } else if (eventDescription.length < 10) {
            newErrors.eventDescription = "תיאור האירוע חייב להכיל לפחות 10 תווים";
        }

        // תת יחידות (אם נדרש)
        if (subUnits.trim().length === 0) {
            newErrors.subUnits = "יש להזין תתי־יחידות";
        }

        // חומרת האירוע
        if (!eventSeverity.trim()) {
            newErrors.eventSeverity = "יש לבחור חומרת אירוע";
        }

        // תוצאות האירוע
        if (!results.trim()) {
            newErrors.results = "יש לבחור תוצאה";
        }

        // תאריך ושעה
        if (!eventDateTime.trim()) {
            newErrors.eventDateTime = "יש לבחור תאריך ושעה";
        } else {
            const selected = new Date(eventDateTime);
            const now = new Date();

            if (selected > now) {
                newErrors.eventDateTime = "תאריך לא יכול להיות בעתיד";
            }
        }

        // רמת פציעות — חובה רק אם יש נפגעים
        if (results?.includes("יש נפגעים")){
            if (!injuriesLevel.trim()){
                newErrors.injuriesLevel = "יש לבחור דרגת פציעה";
            }
        }

        return newErrors;
    }

    function resetForm(){
        setUnitActivityType("")
        setActivityType("")
        setCategory("")
        setLocation("")
        setTypeLocation("")
        setInputLng("")
        setInputLat("")
        setStringLoc("")
        setEventDescription("")
        setSubUnits("")
        setEventSeverity("")
        setResults("")
        setInjuriesLevel("")
        setEventDateTime("")
        setCurrentLocation(null)
        setErrors({})
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newErrors = validateForm();

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return

        const newEvent: EventType = {
            unitActivityType,
            activityType,
            category,
            location,
            eventSeverity,
            results,
            eventDescription,
            subUnits,
            eventDateTime
        };

        if (location === "שטח אזרחי") {
            let locData = null;

            switch (typeLocation) {
                case "נצ":
                    locData = {
                        lat: Number(inputLat),
                        lng: Number(inputLng),
                    };
                    break;

                case "לווין":
                    locData = currentLocation ?? null;
                    break;

                case "ידנית":
                    locData = { text: stringLoc };
                    break;

                default:
                    locData = null;
            }

            newEvent.loc = {
                type: typeLocation || null,
                data: locData
            };
        }

        if (results?.includes("יש נפגעים")) {
            newEvent.injuriesLevel = injuriesLevel;
        }

        console.log("EVENT:", newEvent);
        resetForm()
    }

    return(
        <form onSubmit={handleSubmit} className={styles.formContainrWraper}>
            <h1 className={styles.formHeader}>הזנת פרטי האירוע</h1>

            <div className={styles.formContainr}>

                <EventFormSection title={"פרטים"}>
                    <div className={styles.flexRowContainer}>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">מאפיין פעילות היחידה</label>
                            <CustomSelect
                                options={options.unitActivityTypeArr}
                                value={unitActivityType}
                                onChange={setUnitActivityType}
                            />
                            {errors.unitActivityType && <p className={styles.error}>{errors.unitActivityType}</p>}
                        </div>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">מאפיין פעילות הפרט</label>
                            <CustomSelect
                                options={options.activityTypeArr}
                                value={activityType}
                                onChange={setActivityType}
                            />
                            {errors.activityType && <p className={styles.error}>{errors.activityType}</p>}
                        </div>
                    </div>

                    <div className={styles.flexRowContainer}>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">מאפיין תחומי</label>
                            <CustomSelect
                                options={options.categoryArr}
                                value={category}
                                onChange={setCategory}
                            />
                            {errors.category && <p className={styles.error}>{errors.category}</p>}
                        </div>
                    </div>

                    <div className={styles.lableWraper}>
                        <label htmlFor="">מקום האירוע</label>

                        <RadioGroup
                            options={options.locationArr}
                            value={location}
                            onChange={setLocation}
                            name="location"
                        />
                        {errors.location && <p className={styles.error}>{errors.location}</p>}
                    </div>
                </EventFormSection>


                {location?.includes("שטח אזרחי") && (
                    <EventFormSection title={"מיקום מדויק"}>

                        <RadioGroup
                            options={["נצ", "לווין", "ידנית"]}
                            value={typeLocation}
                            onChange={setTypeLocation}
                            name="typeLocation"
                            />

                        <div className={styles.lableWraper}>
                        <label>הוסף מיקום</label>
                        {errors.typeLocation && <p className={styles.error}>{errors.typeLocation}</p>}

                        {typeLocation === "נצ" && (
                            <>
                            <label htmlFor="lon">אורך:</label>
                            <input 
                                className={styles.inputLoc} 
                                id="lon" 
                                type="number" 
                                placeholder="הכנס את הספרות של אורך"
                                value={inputLng}
                                onChange={e => setInputLng(e.target.value)} />
                                {errors.inputLng && <p className={styles.error}>{errors.inputLng}</p>}

                            <label htmlFor="lat">רוחב:</label>
                            <input 
                                className={styles.inputLoc} 
                                id="lat" 
                                type="number" 
                                placeholder="הכנס את הספרות של רוחב"
                                value={inputLat}
                                onChange={e => setInputLat(e.target.value)} />
                                {errors.inputLat && <p className={styles.error}>{errors.inputLat}</p>}
                            </>
                        )}

                        {typeLocation === "לווין" && (
                            <>
                            <button type="button" className={styles.locationBtn} onClick={takeCurrentLocation}>
                                קח מיקום עכשיו
                            </button>

                            {currentLocation && (
                                <div>
                                    <h2>המיקום שנבחר:</h2>
                                    <p className={styles.latLng}>אורך: {currentLocation.lat}</p>
                                    <p className={styles.latLng}>רוחב: {currentLocation.lng}</p>
                                </div>
                            )}
                            {errors.currentLocation && <p className={styles.error}>{errors.currentLocation}</p>}
                            </>
                        )}

                        {typeLocation === "ידנית" && (
                            <>
                            <input 
                                className={styles.inputLoc} 
                                type="text" 
                                placeholder="הוסף כאן בכתב את המיקום"
                                value={stringLoc}
                                onChange={e => setStringLoc(e.target.value)} />
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
                            value={eventSeverity}
                            onChange={setEventSeverity}
                            name="aaaaaa"
                        />
                        {errors.eventSeverity && <p className={styles.error}>{errors.eventSeverity}</p>}
                    </div>
                    <div className={styles.lableWraper}>
                        <label htmlFor="">פירוט נרחב</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="כתוב כאן פירוט עד 800 מילים"
                            value={eventDescription}
                            onChange={e => setEventDescription(e.target.value)}
                        ></textarea>
                        {errors.eventDescription && <p className={styles.error}>{errors.eventDescription}</p>}
                    </div>
                    <div className={styles.lableWraper}>
                        <label htmlFor="">יחידות משנה</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="כתוב כאן פירוט עד 800 מילים"
                            value={subUnits}
                            onChange={e => setSubUnits(e.target.value)}
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
                            value={eventDateTime}
                            onChange={(e) => setEventDateTime(e.target.value)}
                            max={new Date().toISOString().slice(0, 16)}
                            />
                        {errors.eventDateTime && <p className={styles.error}>{errors.eventDateTime}</p>}
                    </div>

                    <div className={styles.lableWraper}>
                        <label htmlFor="">תוצאות האירוע</label>
                        <CustomSelect
                            options={options.resultsArr}
                            value={results}
                            onChange={setResults}
                            />
                        {errors.results && <p className={styles.error}>{errors.results}</p>}
                    </div>
                </EventFormSection>


                {results?.includes("יש נפגעים") && (
                    <EventFormSection title={"עוצמות הפגיעה"}>
                        <div className={styles.lableWraper}>
                            <label htmlFor="">חומרת הפגיעה </label>
                            <CustomSelect
                                options={options.injuriesLevelArr}
                                value={injuriesLevel}
                                onChange={setInjuriesLevel}
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