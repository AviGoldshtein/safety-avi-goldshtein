export interface EventType {
    unitActivityType: string;
    activityType: string;
    category: string;
    location: string;
    eventSeverity: string;
    results: string;
    eventDescription: string;
    subUnits: string;
    eventDateTime: string;
    loc?: { type: string | null; data: any } | null;
    injuriesLevel?: string;
}
export interface FormErrors {
    unitActivityType?: string;
    activityType?: string;
    category?: string;
    location?: string;
    typeLocation?: string;
    inputLat?: string;
    inputLng?: string;
    stringLoc?: string;
    currentLocation?: string;
    eventDescription?: string;
    subUnits?: string;
    eventSeverity?: string;
    results?: string;
    eventDateTime?: string;
    injuriesLevel?: string;
    weather?: string;
}
export interface Location {
    lat: number;
    lng: number;
}

export interface FormData {
    unitActivityType: string;
    activityType: string;
    category: string;
    location: string;

    typeLocation: string;
    inputLat: string;
    inputLng: string;
    stringLoc: string;
    currentLocation: Location;
    weather: string;

    eventDescription: string;
    subUnits: string;
    eventSeverity: string;
    results: string;
    injuriesLevel: string;
    eventDateTime: string;
}
