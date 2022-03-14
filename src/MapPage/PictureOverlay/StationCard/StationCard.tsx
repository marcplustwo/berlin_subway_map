/** @jsxImportSource @emotion/react */
import React from "react";
import {
  Box,
  Chip,
  Fab,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";

import { Station } from "../../../interfaces/station";
import { routeColors } from "../../../constants/routeColors";
import { StationImg } from "./StationImg";

const paperStyle = css({
  padding: "0.2rem",
});

const fabStyle = css({
  position: "relative",
  bottom: "4rem",
  left: "0.5rem",
});

interface StationCardProps {
  station: Station;
  small?: boolean;
  onClick(): void;
}

const StationCard: React.FC<StationCardProps> = (props) => {
  return (
    <Paper
      onClick={props.onClick}
      css={paperStyle}
      style={{
        height: props.small ? "70%" : "100%",
        opacity: props.small ? "0.7" : "1",
        width: "250px",
        backgroundColor: `${
          routeColors[props.station.route_short_name].color
        }aa`,
      }}
      elevation={3}
    >
      <Box
        style={{ padding: "0 0.3rem" }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography noWrap variant="h6">
          {props.station.stop_name.replace("(Berlin)", "")}
        </Typography>
        <Chip label={props.station.route_short_name} />
      </Box>
      <ImageList cols={1} rowHeight={props.small ? 0.7 * 240 : 240}>
        <ImageListItem>
          <StationImg isPreview stopId={props.station.stop_id} id={1} />
        </ImageListItem>
      </ImageList>
      {!props.small && (
        <Fab size="small" css={fabStyle} aria-label="add">
          <ZoomOutMap />
        </Fab>
      )}
    </Paper>
  );
};

export { StationCard };
