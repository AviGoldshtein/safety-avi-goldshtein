import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: "60px",
        backgroundColor: "primary.main",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme => theme.zIndex.appBar,
      }}
    >
      <Typography variant="body2" fontStyle="italic">נכתב על ידי: אבי גולדשטיין</Typography>
    </Box>
  );
}
