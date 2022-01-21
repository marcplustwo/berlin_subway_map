import React from "react";
import { AppBar, Typography } from "@mui/material";

const Bar: React.FC = () => (
  <AppBar position="sticky" style={{ padding: "0.3rem" }}>
    <Typography variant="h6">U-Bahn Map Berlin</Typography>
  </AppBar>
);

export { Bar };
