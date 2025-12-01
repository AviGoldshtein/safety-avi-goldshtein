import { Box, Button, Typography, TextField } from "@mui/material";
import FormField from "../../FormField/FormField";
import RadioGroup from "../../RadioGroup/RadioGroup";
import options from "../../../data/options";
import { LOCATION_CIVIL } from "../../../constants/eventConstants";
import type { Step2Props } from "./stepTypes";


export default function Step2Location({ formData, errors, updateField, takeCurrentLocation }: Step2Props) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormField label="מקום האירוע" error={errors.location}>
        <RadioGroup
          options={options.locationArr}
          value={formData.location}
          onChange={(val) => updateField("location", val)}
          name="location"
        />
      </FormField>

      {formData.location?.includes(LOCATION_CIVIL) && (
        <>
          <FormField label="סוג מיקום" error={errors.typeLocation}>
            <RadioGroup
              options={options.typeLocationArr}
              value={formData.typeLocation}
              onChange={(val) => updateField("typeLocation", val)}
              name="typeLocation"
            />
          </FormField>

          {formData.typeLocation === "נצ" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormField label="אורך:" error={errors.inputLng}>
                <TextField
                    type="number"
                    placeholder="הכנס אורך"
                    value={formData.inputLng}
                    onChange={(e) => updateField("inputLng", e.target.value)}
                    size="small"
                />
              </FormField>

              <FormField label="רוחב:" error={errors.inputLat}>
                <TextField
                    type="number"
                    placeholder="הכנס רוחב"
                    value={formData.inputLat}
                    onChange={(e) => updateField("inputLat", e.target.value)}
                    size="small"
                />
              </FormField>
            </Box>
          )}

          {formData.typeLocation === "לווין" && (
            <FormField label="מיקום לוויני:" error={errors.currentLocation}>
              <Button
                variant="contained"
                sx={{ bgcolor: "secondary", borderRadius: 2, mt: 1 }}
                onClick={takeCurrentLocation}
              >
                קח מיקום עכשיו
              </Button>

              {formData.currentLocation && (
                <Box sx={{ mt: 1, textAlign: "center" }}>
                  <Typography variant="body2">המיקום שנבחר:</Typography>
                  <Typography sx={{bgcolor: "secondary.main", borderRadius: 1, margin: 0.1}} variant="body2">
                    אורך: {formData.currentLocation.lng}
                  </Typography>
                  <Typography sx={{bgcolor: "secondary.main", borderRadius: 1, margin: 0.1}} variant="body2">
                    רוחב: {formData.currentLocation.lat}
                  </Typography>
                </Box>
              )}
            </FormField>
          )}
        </>
      )}
    </Box>
  );
}
