import { Box, TextField } from "@mui/material";
import { CalendarToday, AccessTime, FactCheck, MedicalServices } from "@mui/icons-material"

import { RESULT_HAS_INJURED } from "../../../constants/eventConstants";
import type { Step5Props } from "./stepTypes";
import { stepWrapperStyle, fieldWithIconStyle } from '../EventFormWizardStyles'

import FormField from "../../FormField/FormField";
import CustomSelect from "../../CustomSelect/CustomSelect";
import options from "../../../data/options";


export default function Step5DateAndResults({ formData, errors, updateField }: Step5Props) {

  return (
    <Box sx={stepWrapperStyle}>
      <FormField label="תאריך" error={errors.eventDateTime}>
        <Box sx={fieldWithIconStyle}>
          <CalendarToday fontSize="small" />
          <TextField
            type="date"
            value={formData.eventDateTime}
            onChange={(e) => updateField("eventDateTime", e.target.value)}
            inputProps={{ max: new Date().toISOString().slice(0, 10) }}
            size="small"
            sx={{width: "100%"}}
          />
        </Box>
      </FormField>

      <FormField label="שעה (לצפייה בלבד)">
        <Box sx={fieldWithIconStyle}>
          <AccessTime fontSize="small" />
          <TextField
            type="time"
            value={formData.eventTime || ""}
            size="small"
            sx={{width: "100%"}}
            disabled
          />
        </Box>
      </FormField>

      <FormField label="תוצאות האירוע" error={errors.results}>
        <CustomSelect
          options={options.resultsArr}
          value={formData.results}
          onChange={(val) => updateField("results", val)}
          icon={<FactCheck fontSize="small" />}
        />
      </FormField>

      {formData.results?.includes(RESULT_HAS_INJURED) && (
        <FormField label="חומרת הפגיעה" error={errors.injuriesLevel}>
          <CustomSelect
            options={options.injuriesLevelArr}
            value={formData.injuriesLevel}
            onChange={(val) => updateField("injuriesLevel", val)}
            icon={<MedicalServices fontSize="small" />}
          />
        </FormField>
      )}
    </Box>
  );
}
