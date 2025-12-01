import { Box, TextField } from "@mui/material";
import FormField from "../../FormField/FormField";
import CustomSelect from "../../CustomSelect/CustomSelect";
import options from "../../../data/options";
import { RESULT_HAS_INJURED } from "../../../constants/eventConstants";
import type { Step5Props } from "./stepTypes";


export default function Step5DateAndResults({ formData, errors, updateField }: Step5Props) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormField label="תאריך ושעה" error={errors.eventDateTime}>
        <TextField
          type="datetime-local"
          value={formData.eventDateTime}
          onChange={(e) => updateField("eventDateTime", e.target.value)}
          inputProps={{ max: new Date().toISOString().slice(0, 16) }}
          size="small"
        />
      </FormField>

      <FormField label="תוצאות האירוע" error={errors.results}>
        <CustomSelect
          options={options.resultsArr}
          value={formData.results}
          onChange={(val) => updateField("results", val)}
        />
      </FormField>

      {formData.results?.includes(RESULT_HAS_INJURED) && (
        <FormField label="חומרת הפגיעה" error={errors.injuriesLevel}>
          <CustomSelect
            options={options.injuriesLevelArr}
            value={formData.injuriesLevel}
            onChange={(val) => updateField("injuriesLevel", val)}
          />
        </FormField>
      )}
    </Box>
  );
}
