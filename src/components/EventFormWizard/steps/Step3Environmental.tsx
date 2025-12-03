import { Box } from "@mui/material";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

import type { Step3Props } from "./stepTypes";

import FormField from "../../FormField/FormField";
import CustomSelect from "../../CustomSelect/CustomSelect";
import options from "../../../data/options";


export default function Step3Environmental({ formData, errors, updateField }: Step3Props) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormField label="תנאים סביבתיים - מזג אוויר" error={errors.weather}>
        <CustomSelect
          options={options.weatherArr}
          value={formData.weather}
          onChange={(val) => updateField("weather", val)}
          icon={ <UmbrellaIcon fontSize="small" />}
        />
      </FormField>
    </Box>
  );
}
