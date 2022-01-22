/** @jsxImportSource @emotion/react */
import React from "react";
import { Paper, Button, Typography } from "@mui/material";
import { css } from "@emotion/react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/system";
import { getAdjacentStations, getStationById } from "../data/getRoutesData";
import { StationCard } from "./StationCard";

interface PictureOverlayProps {
  currentStationId: string | undefined;
  setCurrentStationId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const paperStyle = css({
  position: "absolute",
  height: "32vh",
  bottom: "0.5rem",
  left: "0.5rem",
  right: "0.5rem",
  padding: "0.5rem",
  opacity: "1",
  // "&:hover": {
  //   opacity: "1",
  // },
});

const PictureOverlay: React.FC<PictureOverlayProps> = (props) => {
  if (!props.currentStationId) {
    return (
      <Paper css={paperStyle} elevation={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          style={{ height: "100%" }}
        >
          <Typography variant="body1">
            Please click on a marker to start exploring a subway line.
          </Typography>
        </Box>
      </Paper>
    );
  }

  const station = getStationById(props.currentStationId);

  const [prevStation, nextStation] = getAdjacentStations(
    props.currentStationId
  );

  console.log({ prevStation, station, nextStation });

  return (
    <Paper css={paperStyle} elevation={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        style={{ height: "100%" }}
      >
        <Button
          variant="text"
          disabled={!prevStation}
          onClick={() => props.setCurrentStationId(prevStation?.stop_id)}
        >
          <ArrowBackIos />
        </Button>
        {prevStation && <StationCard small station={prevStation} />}
        <StationCard station={station} />
        {nextStation && <StationCard small station={nextStation} />}
        <Button
          variant="text"
          disabled={!nextStation}
          onClick={() => props.setCurrentStationId(nextStation?.stop_id)}
        >
          <ArrowForwardIos />
        </Button>
      </Box>
    </Paper>
  );
};

export { PictureOverlay };
