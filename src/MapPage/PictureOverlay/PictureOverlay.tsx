/** @jsxImportSource @emotion/react */
import React from "react";
import { Paper, Button, Typography } from "@mui/material";
import { css } from "@emotion/react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/system";
import { getAdjacentStations } from "../SubwayMap/data/getRoutesData";
import { StationCard } from "./StationCard/StationCard";
import { EmptyStationCard } from "./StationCard/EmptyStationCard";
import { Station } from "../../interfaces/station";

interface PictureOverlayProps {
  station: Station | undefined;
  setCurrentStationId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const paperStyle = css({
  position: "absolute",
  height: "32vh",
  bottom: "0.5rem",
  left: "0.5rem",
  right: "0.5rem",
  padding: "0.5rem",
});

const PictureOverlay: React.FC<PictureOverlayProps> = (props) => {
  if (!props.station) {
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

  const [prevStation, nextStation] = getAdjacentStations(props.station.stop_id);

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
        {prevStation ? (
          <StationCard
            onClick={() => props.setCurrentStationId(prevStation.stop_id)}
            small
            station={prevStation}
          />
        ) : (
          <EmptyStationCard />
        )}
        <StationCard station={props.station} />
        {nextStation ? (
          <StationCard
            onClick={() => props.setCurrentStationId(nextStation.stop_id)}
            small
            station={nextStation}
          />
        ) : (
          <EmptyStationCard />
        )}
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
