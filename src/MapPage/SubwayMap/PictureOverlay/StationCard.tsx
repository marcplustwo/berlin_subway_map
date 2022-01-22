/** @jsxImportSource @emotion/react */
import React from "react";
import {
  Box,
  Chip,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";

import { Station } from "../../../interfaces/station";

const paperStyle = css({
  padding: "0.2rem",
  // position: "absolute",
  // height: "32vh",
  // bottom: "0.5rem",
  // left: "0.5rem",
  // right: "0.5rem",
  // padding: "0.5rem",
  // opacity: "1",
  // "&:hover": {
  //   opacity: "1",
  // },
});

interface StationCardProps {
  station: Station;
  small?: boolean;
}

const StationCard: React.FC<StationCardProps> = (props) => {
  const img = "http://localhost:8001/placeholder.JPG";

  return (
    <Paper
      css={paperStyle}
      style={{ height: props.small ? "70%" : "100%", width: "250px" }}
      elevation={3}
    >
      {/* <Box
        sx={{
          display: "flex",
          alignContent: "space-between",
          flexDirection: "column",
        }}
      > */}
      <Box
        style={{ padding: "0 0.3rem" }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // justifyItems: "space-between",
        }}
      >
        <Typography noWrap variant="h6">
          {props.station.stop_name.replace("(Berlin)", "")}
        </Typography>
        <Chip label={props.station.route_short_name} />
      </Box>
      <ImageList cols={1} rowHeight={props.small ? 0.7 * 240 : 240}>
        <ImageListItem>
          <img
            style={{ height: "100%", width: "100%" }}
            src={img}
            loading="lazy"
          />
        </ImageListItem>
      </ImageList>
      {/* </Box> */}
    </Paper>
  );
};

export { StationCard };
