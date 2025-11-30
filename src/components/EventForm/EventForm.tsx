import type { FormEvent } from "react";
import { Box, Container, Typography, Button, TextField, useTheme } from "@mui/material";

import options from '../../data/options';
import CustomSelect from '../CustomSelect/CustomSelect';
import RadioGroup from "../RadioGroup/RadioGroup";
import EventFormSection from "../EventFormSection/EventFormSection";
import { useEventForm } from "../../hooks/useEventForm";
import FormField from "../FormField/FormField";
import { LOCATION_CIVIL, RESULT_HAS_INJURED } from "../../constants/eventConstants";

export default function EventForm() {
  const theme = useTheme();
  const { formData, errors, updateField, takeCurrentLocation, handleSubmit } = useEventForm();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit((data) => {
      console.log("EVENT:", data);
    });
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:
            theme.palette.mode === "light"
                ? "#d4e3ffff"
                : "rgb(33, 47, 82)",
        padding: 2,
        borderRadius: 2,
        width: "fit-content",
        maxWidth: "100%",
        transition: "background-color 0.3s ease",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontStyle: "italic", mb: 2 }}
      >
        הזנת פרטי האירוע
      </Typography>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          transition: "all 1s ease",
          backgroundColor:
            theme.palette.mode === "light"
                ? "rgba(139, 140, 156, 1)"
                : "rgb(71,70,79)",
          padding: 2,
          borderRadius: 3,
          color: "black",
        }}
      >
        <EventFormSection title={"פרטים"}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormField label="מאפיין פעילות היחידה" error={errors.unitActivityType}>
              <CustomSelect
                options={options.unitActivityTypeArr}
                value={formData.unitActivityType}
                onChange={(val) => updateField("unitActivityType", val)}
              />
            </FormField>

            <FormField label="מאפיין פעילות הפרט" error={errors.activityType}>
              <CustomSelect
                options={options.activityTypeArr}
                value={formData.activityType}
                onChange={(val) => updateField("activityType", val)}
              />
            </FormField>
          </Box>

          <FormField label="מאפיין תחומי" error={errors.category}>
            <CustomSelect
              options={options.categoryArr}
              value={formData.category}
              onChange={(val) => updateField("category", val)}
            />
          </FormField>

          <FormField label="מקום האירוע" error={errors.location}>
            <RadioGroup
              options={options.locationArr}
              value={formData.location}
              onChange={(val) => updateField("location", val)}
              name="location"
            />
          </FormField>
        </EventFormSection>

        {formData.location?.includes(LOCATION_CIVIL) && (
          <EventFormSection title={"מיקום מדויק"}>
            <FormField label="סוג מיקום" error={errors.typeLocation}>
              <RadioGroup
                options={options.typeLocationArr}
                value={formData.typeLocation}
                onChange={(val) => updateField("typeLocation", val)}
                name="typeLocation"
              />
            </FormField>

            {formData.typeLocation === "נצ" && (
                <>
                <FormField label="אורך:" error={errors.inputLng}>
                  <TextField
                    type="number"
                    placeholder="הכנס את הספרות של אורך"
                    value={formData.inputLng}
                    onChange={(e) => updateField("inputLng", e.target.value)}
                    size="small"
                    sx={{ borderRadius: 2, bgcolor: "white" }}
                  />
                </FormField>

                <FormField label="רוחב:" error={errors.inputLat}>
                  <TextField
                    type="number"
                    placeholder="הכנס את הספרות של רוחב"
                    value={formData.inputLat}
                    onChange={(e) => updateField("inputLat", e.target.value)}
                    size="small"
                    sx={{ borderRadius: 2, bgcolor: "white" }}
                  />
                </FormField>
                </>
            )}

            {formData.typeLocation === "לווין" && (
              <FormField label="מיקום לוויני:" error={errors.currentLocation}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "rgb(127,163,255)", borderRadius: 2, mt: 1 }}
                  onClick={takeCurrentLocation}
                >
                  קח מיקום עכשיו
                </Button>

                {formData.currentLocation && (
                  <Box sx={{ mt: 1, textAlign: "center" }}>
                    <Typography variant="body2">המיקום שנבחר:</Typography>
                    <Typography sx={{backgroundColor: "rgba(157, 185, 255, 1)", borderRadius: 1, margin: 0.1}} variant="body2">אורך: {formData.currentLocation.lng}</Typography>
                    <Typography sx={{backgroundColor: "rgba(157, 185, 255, 1)", borderRadius: 1, margin: 0.1}} variant="body2">רוחב: {formData.currentLocation.lat}</Typography>
                  </Box>
                )}
              </FormField>
            )}

            {formData.typeLocation === "ידנית" && (
              <FormField label="כתוב מיקום:" error={errors.stringLoc}>
                <TextField
                  type="text"
                  placeholder="הוסף כאן בכתב את המיקום"
                  value={formData.stringLoc}
                  onChange={(e) => updateField("stringLoc", e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2, bgcolor: "white" }}
                />
              </FormField>
            )}
          </EventFormSection>
        )}

        <EventFormSection title={"תיאור האירוע"}>
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
        </EventFormSection>

        <EventFormSection title={"תאריך, שעה ותוצאות האירוע"}>
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
        </EventFormSection>
      </Container>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: "1.5rem",
          bgcolor: "#4a74f5",
          borderRadius: 1,
          boxShadow: 3,
          transition: "all 0.3s ease",
          "&:hover": { opacity: 0.8, transform: "translateY(-2px)" },
        }}
      >
        דווח על האירוע
      </Button>
    </Box>
  );
}
