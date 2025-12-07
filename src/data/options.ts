const unitActivityTypeArr = [
  'תע"ם',
  "אימונים",
  "הכשרה",
  "רגיעה / מנהלה",
  "מלחמה/מבצע צבאי נרחב",
] as const;

const activityTypeArr = [
  "פעילות מבצעית/לחימה",
  "אימון",
  "הכשרה",
  "שגרה",
  "פנאי",
  "חופשה",
] as const;

const categoryArr = [
  "נשק ומקלעים",
  "דרכים",
  "תחמושת",
  `ירי דו"צ`,
  "מזג-אוויר",
  `רק"מ וצמ"ה קרביים`,
  `שת"פ אוויר`,
  "עבודה",
  "אוויר",
  "בטיחות ימי",
  "ספורט ואקסטרים",
  "נפילות/חבלות",
  "חריגות ירי או תנועה של כוחות בשטחי אימונים",
  `חומ"ס`,
  `אמל"ח (לא נשק/מקלעים)`,
  "אש",
  `טג"ח קרבי`,
  `שת"פ ים`,
  "ייעודי עורף/חילוץ והצלה",
  "אמצעי רום קרוב לקרקע",
  "כושר גופני/קרבי",
] as const;

const locationArr = [ "בסיס", "שטח אזרחי", "שטח אש", "רציף"] as const;

const eventSeverityArr = [ "קל", "בינוני", "חמור"] as const;

const resultsArr = [
  `א.נ.א.נ (אין נפגעים, אין נזק) `,
  `א.נ.י.נ (אין נפגעים, יש נזק) `,
  `י.נ.א.נ (יש נפגעים, אין נזק) `,
  `י.נ.י.נ (יש נפגעים, יש נזק) `,
] as const;

const injuriesLevelArr = [
  "ללא פגיעה",
  "פגוע קל (ללא אשפוז)",
  "פגוע קל (שאושפז)",
  "פגוע בינוני",
  "פגוע קשה/אנוש",
  "חלל",
] as const;

export const weatherArr = [
  "שרב/עומס חום",
  "שלג",
  "סופת חול",
  "גשם",
  "ערפל",
  "התקרחות",
  "ברד",
  "מעונן",
  "נאה",
  "רוח",
  "ים סוער",
  "מים שקטים",
] as const;

const typeLocationArr = ["נצ", "לווין"] as const;


const options = {
  unitActivityTypeArr,
  activityTypeArr,
  categoryArr,
  locationArr,
  eventSeverityArr,
  resultsArr,
  injuriesLevelArr,
  typeLocationArr,
  weatherArr
};

export default options;
