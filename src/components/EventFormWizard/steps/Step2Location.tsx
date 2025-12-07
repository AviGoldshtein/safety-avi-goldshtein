import { Box, Button, Typography, TextField, InputAdornment } from "@mui/material";
import { LocationOn, GpsFixed, PersonPinCircle, PinDrop, Straighten, Height } from "@mui/icons-material"

import { LOCATION_CIVIL, LOCATION_TYPE_COORDINATE } from "../../../constants/eventConstants";
import type { Step2Props } from "./stepTypes";
import { stepWrapperStyle, takeLocBtnStyle, selectedLocationTitleStyle, coordinateBoxStyle } from '../EventFormWizardStyles'

import FormField from "../../FormField/FormField";
import RadioGroup from "../../RadioGroup/RadioGroup";
import options from "../../../data/options";


export default function Step2Location({ formData, errors, updateField, takeCurrentLocation }: Step2Props) {

  return (
    <Box sx={stepWrapperStyle}>
      <FormField label="מקום האירוע" error={errors.location}>
        <RadioGroup
          options={options.locationArr}
          value={formData.location}
          onChange={(val) => updateField("location", val)}
          name="location"
          icon={<LocationOn fontSize="large" />}
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
              icon={<PinDrop fontSize="large" />}
            />
          </FormField>

          {formData.typeLocation === LOCATION_TYPE_COORDINATE && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormField label="אורך:" error={errors.inputLng}>
                <TextField
                    type="number"
                    placeholder="הכנס אורך"
                    value={formData.inputLng}
                    onChange={(e) => updateField("inputLng", e.target.value)}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Straighten fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                />
              </FormField>

              <FormField label="רוחב:" error={errors.inputLat}>
                <TextField
                    type="number"
                    placeholder="הכנס רוחב"
                    value={formData.inputLat}
                    onChange={(e) => updateField("inputLat", e.target.value)}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Height fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                />
              </FormField>
            </Box>
          )}

          {formData.typeLocation === "לווין" && (
            <FormField label="מיקום לוויני:" error={errors.currentLocation}>
              <Button
                variant="contained"
                sx={takeLocBtnStyle}
                onClick={takeCurrentLocation}
              >
                <GpsFixed fontSize="small" sx={{ml: 1}} />
                קח מיקום עכשיו
              </Button>

              {formData.currentLocation && (
                <Box sx={{ mt: 1, textAlign: "center" }}>
                  <Typography sx={selectedLocationTitleStyle}>
                    <PersonPinCircle fontSize="small" />
                    המיקום שנבחר:
                  </Typography>
                  <Typography sx={coordinateBoxStyle} variant="body2">
                    אורך: {formData.currentLocation.lng}
                  </Typography>
                  <Typography sx={coordinateBoxStyle} variant="body2">
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
