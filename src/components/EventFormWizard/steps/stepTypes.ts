import type { FormData, FormErrors } from "../types";

export interface StepBaseProps {
  formData: FormData;
  errors: FormErrors;
  updateField: (key: keyof FormData, value: any) => void;
}

export type Step1Props = StepBaseProps;
export type Step3Props = StepBaseProps;
export type Step4Props = StepBaseProps;
export type Step5Props = StepBaseProps;

export interface Step2Props extends StepBaseProps {
  takeCurrentLocation: () => void;
}