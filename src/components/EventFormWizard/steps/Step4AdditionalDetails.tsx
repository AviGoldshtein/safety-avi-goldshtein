import { Box, TextField } from "@mui/material";
import FormField from "../../FormField/FormField";
import RadioGroup from "../../RadioGroup/RadioGroup";
import options from "../../../data/options";
import type { Step4Props } from "./stepTypes";


export default function Step4AdditionalDetails({ formData, errors, updateField }: Step4Props) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormField label="חומרת האירוע" error={errors.eventSeverity}>
        <RadioGroup
          options={options.eventSeverityArr}
          value={formData.eventSeverity}
          onChange={(val) => updateField("eventSeverity", val)}
          name="eventSeverity"
        />
      </FormField>

      <FormField label="פירוט נרחב" error={errors.eventDescription}>
        <TextField
          multiline
          minRows={4}
          maxRows={8}
          placeholder="כתוב כאן פירוט עד 800 תווים"
          value={formData.eventDescription}
          onChange={(e) => updateField("eventDescription", e.target.value)}
          fullWidth
          size="small"
        />
      </FormField>

      <FormField label="יחידות משנה" error={errors.subUnits}>
        <TextField
          multiline
          minRows={2}
          maxRows={6}
          placeholder="כתוב כאן פירוט עד 800 תווים"
          value={formData.subUnits}
          onChange={(e) => updateField("subUnits", e.target.value)}
          fullWidth
          size="small"
        />
      </FormField>
    </Box>
  );
}
