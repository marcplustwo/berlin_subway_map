/** @jsxImportSource @emotion/react */
import React from "react";
import { Paper } from "@mui/material";
import { css } from "@emotion/react";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";

interface GalleryProps {}

const paperStyle = css({
  position: "absolute",
  height: "32vh",
  bottom: "0.5rem",
  left: "0.5rem",
  right: "0.5rem",
  padding: "0.5rem",
});

const Gallery: React.FC<GalleryProps> = (props) => {
  return (
    <Paper css={paperStyle} elevation={3}>
      TEST
    </Paper>
  );
};

export { Gallery };
