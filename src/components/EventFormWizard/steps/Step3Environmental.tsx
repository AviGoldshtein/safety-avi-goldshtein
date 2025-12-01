import { Box } from "@mui/material";
import FormField from "../../FormField/FormField";
import CustomSelect from "../../CustomSelect/CustomSelect";
import options from "../../../data/options";
import type { Step3Props } from "./stepTypes";

export default function Step3Environmental({ formData, errors, updateField }: Step3Props) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormField label="תנאים סביבתיים - מזג אוויר" error={errors.weather}>
        <CustomSelect
          options={options.weatherArr}
          value={formData.weather}
          onChange={(val) => updateField("weather", val)}
        />
      </FormField>
    </Box>
  );
}
