import { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useEventForm } from "../../hooks/useEventForm";
import type { FormErrors } from "./types";
import { wrapperStyle, btnsWrapperStyle } from './EventFormWizardStyles'

import Step1BasicDetails from "./steps/Step1BasicDetails";
import Step2Location from "./steps/Step2Location";
import Step3Environmental from "./steps/Step3Environmental";
import Step4AdditionalDetails from "./steps/Step4AdditionalDetails";
import Step5DateAndResults from "./steps/Step5DateAndResults";

const steps = [
  "פרטי האירוע",
  "מיקום האירוע",
  "תנאים סביבתיים",
  "פרטים משלימים",
  "תאריך ותוצאות"
];

const stepFields: Record<number, string[]> = {
  0: ["unitActivityType", "activityType", "category"],
  1: ["location", "typeLocation", "inputLat", "inputLng", "currentLocation"],
  2: ["weather"],
  3: ["eventSeverity", "eventDescription", "subUnits"],
  4: ["eventDateTime", "results", "injuriesLevel"]
};

export default function EventFormWizard() {
  const { formData, errors, setErrors, handleSubmit, validateEventForm, updateField, takeCurrentLocation, resetForm } = useEventForm();
  const [activeStep, setActiveStep] = useState(0);

  const sharedProps = {
    formData,
    errors,
    updateField,
  };

  const stepComponents = [
    <Step1BasicDetails {...sharedProps} />,
    <Step2Location {...sharedProps} takeCurrentLocation={takeCurrentLocation} />,
    <Step3Environmental {...sharedProps} />,
    <Step4AdditionalDetails {...sharedProps} />,
    <Step5DateAndResults {...sharedProps} />
  ];

  function stepHasErrors(stepIndex: number) {
    const fields = stepFields[stepIndex];
    return fields.some(f => errors[f as keyof FormErrors]);
  }

  function validateCurrentStep(): FormErrors {
    return validateEventForm(
      formData,
      stepFields[activeStep] as (keyof FormErrors)[]
    );
  }

  function handleNext() {
    const stepErrors = validateCurrentStep();
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) return;

    setActiveStep(prev => prev + 1);
  }

  function handleBack() {
    setActiveStep(prev => prev - 1);
  }

  function handleFinalSubmit() {
    const allErrors = validateEventForm(formData);
    setErrors(allErrors);
    
    if (Object.keys(allErrors).length > 0) return;

    handleSubmit((data) => {
      console.log("Sending to server:", data);
    });

    resetForm();
    setActiveStep(0);
  }

  return (
    <Box sx={wrapperStyle}>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label, i) => (
          <Step key={label}>
            <StepLabel error={stepHasErrors(i)} StepIconProps={{sx:{ ml: 1} }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepComponents[activeStep]}

      <Box sx={btnsWrapperStyle}>
        <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>חזור</Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>הבא</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleFinalSubmit} endIcon={<SendIcon sx={{mr: 2}} />}>
            שלח
          </Button>
        )}
      </Box>
    </Box>
  );
}
