import { Box } from "@mui/material";
import { MilitaryTech, FitnessCenter, Category } from "@mui/icons-material"

import type { Step1Props } from "./stepTypes";
import { stepWrapperStyle } from '../EventFormWizardStyles'

import CustomSelect from "../../CustomSelect/CustomSelect";
import FormField from "../../FormField/FormField";
import options from "../../../data/options";


export default function Step1BasicDetails({
  formData,
  errors,
  updateField,
}: Step1Props) {
  return (
    <Box sx={stepWrapperStyle}>
      <FormField label="מאפיין פעילות היחידה" error={errors.unitActivityType}>
        <CustomSelect
          options={options.unitActivityTypeArr}
          value={formData.unitActivityType}
          onChange={(val) => updateField("unitActivityType", val)}
          icon={<MilitaryTech fontSize="small" />}
        />
      </FormField>

      <FormField label="מאפיין פעילות הפרט" error={errors.activityType}>
        <CustomSelect
          options={options.activityTypeArr}
          value={formData.activityType}
          onChange={(val) => updateField("activityType", val)}
          icon={<FitnessCenter fontSize="small" />}
        />
      </FormField>

      <FormField label="מאפיין תחומי" error={errors.category}>
        <CustomSelect
          options={options.categoryArr}
          value={formData.category}
          onChange={(val) => updateField("category", val)}
          icon={<Category fontSize="small" />}
        />
      </FormField>
    </Box>
  );
}
