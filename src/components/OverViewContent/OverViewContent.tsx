import { Box } from "@mui/material";
import { TableContent } from "../TableContent/TableContent";

export function OverViewContent() {
    
    const content = JSON.parse(localStorage.getItem("eventsList") || "[]");
    const columns = [
        { key: "unitActivityType", label: "יחידה" },
        { key: "activityType", label: "פעילות" },
        { key: "category", label: "תחום" },
        { key: "location", label: "מיקום" },
        { key: "currentLocation", label: "קורדינטות" },
        { key: "weather", label: "מזג אוויר" },
        { key: "eventSeverity", label: "חומרה" },
        { key: "eventDescription", label: "פירוט" },
        { key: "subUnits", label: "תתי-יחידות" },
        { key: "eventDateTime", label: "תאריך" },
        { key: "eventTime", label: "שעה" },
        { key: "results", label: "תוצאות" },
        { key: "injuriesLevel", label: "פגיעות" }
    ];

    return (
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
            <h1>OverView Content Component</h1>

            <TableContent 
                content={content} 
                columns={columns} 
            />
        </Box>
    );
}
