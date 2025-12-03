import type { FormErrors, Location } from "../components/EventFormWizard/types";
import { RESULT_HAS_INJURED } from "../constants/eventConstants";

interface ValidationArgs {
  unitActivityType: string;
  activityType: string;
  category: string;
  location: string;

  typeLocation: string;
  inputLat: string;
  inputLng: string;
  stringLoc: string;
  currentLocation: Location | null;
  weather: string;

  eventDescription: string;
  subUnits: string;
  eventSeverity: string;
  results: string;
  injuriesLevel: string;
  eventDateTime: string;
}

export function validateBasicFields({
  unitActivityType,
  activityType,
  category,
  location,
}: ValidationArgs) {
  const errors: FormErrors = {};

  if (!unitActivityType.trim()) errors.unitActivityType = "יש לבחור מאפיין פעילות יחידה";
  if (!activityType.trim()) errors.activityType = "יש לבחור מאפיין פעילות הפרט";
  if (!category.trim()) errors.category = "יש לבחור מאפיין תחומי";
  if (!location.trim()) errors.location = "יש לבחור מקום אירוע";

  return errors;
}

export function validateLocationFields({
  location,
  typeLocation,
  inputLat,
  inputLng,
  stringLoc,
  currentLocation,
}: ValidationArgs) {
  const errors: FormErrors = {};

  if (location !== "שטח אזרחי") return errors;

  if (!typeLocation.trim()) {
    errors.typeLocation = "יש לבחור סוג מיקום";
    return errors;
  }

  if (typeLocation === "נצ") {
    const lat = Number(inputLat);
    const lng = Number(inputLng);

    if (!inputLat.trim()) errors.inputLat = "יש להזין קו רוחב";
    else if (isNaN(lat) || lat < -90 || lat > 90)
      errors.inputLat = "קו רוחב לא תקין";

    if (!inputLng.trim()) errors.inputLng = "יש להזין קו אורך";
    else if (isNaN(lng) || lng < -180 || lng > 180)
      errors.inputLng = "קו אורך לא תקין";
  }

  if (typeLocation === "לווין") {
    if (!currentLocation) errors.currentLocation = "לא נבחר מיקום";
  }

  return errors;
}

export function validateEnvironmentalSection({ weather }: ValidationArgs) {
  const errors: FormErrors = {};

  if (!weather.trim()) errors.weather = "יש לבחור מצב מזג אוויר";

  return errors;
}

export function validateEventDetails({
  eventDescription,
  subUnits,
  eventSeverity,
}: ValidationArgs) {
  const errors: FormErrors = {};

  if (!eventDescription.trim()) {
    errors.eventDescription = "יש להזין תיאור האירוע";
  } else if (eventDescription.length < 10) {
    errors.eventDescription = "תיאור האירוע חייב להכיל לפחות 10 תווים";
  }

  if (!subUnits.trim()) {
    errors.subUnits = "יש להזין תתי־יחידות";
  }

  if (!eventSeverity.trim()) {
    errors.eventSeverity = "יש לבחור חומרת אירוע";
  }

  return errors;
}

export function validateResultsSection({
  results,
  injuriesLevel,
}: ValidationArgs) {
  const errors: FormErrors = {};

  if (!results.trim()) {
    errors.results = "יש לבחור תוצאה";
  }

  if (results.includes(RESULT_HAS_INJURED) && !injuriesLevel.trim()) {
    errors.injuriesLevel = "יש לבחור דרגת פציעה";
  }

  return errors;
}

export function validateDateTime({ eventDateTime }: ValidationArgs) {
  const errors: FormErrors = {};

  if (!eventDateTime.trim()) {
    errors.eventDateTime = "יש לבחור תאריך ושעה";
  } else {
    const selected = new Date(eventDateTime);
    const now = new Date();

    if (selected > now) {
      errors.eventDateTime = "תאריך לא יכול להיות בעתיד";
    }
  }

  return errors;
}

export function validateEventForm(
  values: ValidationArgs,
  checkFields: (keyof FormErrors)[] | null = null
): FormErrors {
  
  const errors: FormErrors = {
    ...validateBasicFields(values),
    ...validateLocationFields(values),
    ...validateEventDetails(values),
    ...validateEnvironmentalSection(values),
    ...validateResultsSection(values),
    ...validateDateTime(values),
  };

  if (!checkFields) return errors;

  const filtered: FormErrors = {};
  checkFields.forEach((field) => {
    if (errors[field]) filtered[field] = errors[field];
  });

  return filtered;
}

